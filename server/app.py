#!/usr/bin/env python3
"""moose.gr contact form handler.

Single-endpoint HTTP service that runs behind nginx on the moose.gr server
(see server/README.md for setup). POST /api/contact accepts a JSON
submission, emails it to CONTACT_TO, and sends the visitor a
language-matched auto-reply. Python stdlib only — no dependencies.
"""

import json
import os
import re
import smtplib
import ssl
import sys
from datetime import datetime, timezone
from email.message import EmailMessage
from email.utils import formataddr
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# Logs and dry-run output contain Greek; a non-UTF-8 stdout (e.g. cp1252 on
# a Windows dev console) must never turn a log write into a request crash.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "info@moose.gr")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_DRY_RUN = os.environ.get("SMTP_DRY_RUN") == "1"
CONTACT_TO = os.environ.get("CONTACT_TO", "info@moose.gr")
BIND_ADDR = os.environ.get("BIND_ADDR", "127.0.0.1")
BIND_PORT = int(os.environ.get("BIND_PORT", "8321"))

MAX_BODY_BYTES = 64 * 1024
MAX_NAME_LEN = 100
MAX_EMAIL_LEN = 254
MAX_MESSAGE_LEN = 5000
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

AUTO_REPLY = {
    "en": {
        "subject": "We received your message — Moose",
        "body": (
            "Hi {first_name},\n"
            "\n"
            "Thanks for reaching out to Moose. We've received your message and\n"
            "will get back to you within 1 business day.\n"
            "\n"
            "If it's urgent, you can also call us at +30 698 031 0555.\n"
            "\n"
            "— The Moose team\n"
            "https://moose.gr\n"
        ),
    },
    "el": {
        "subject": "Λάβαμε το μήνυμά σας — Moose",
        "body": (
            "Γεια σας {first_name},\n"
            "\n"
            "Ευχαριστούμε που επικοινωνήσατε με τη Moose. Λάβαμε το μήνυμά σας\n"
            "και θα σας απαντήσουμε εντός 1 εργάσιμης ημέρας.\n"
            "\n"
            "Αν είναι επείγον, μπορείτε να μας καλέσετε στο +30 698 031 0555.\n"
            "\n"
            "— Η ομάδα της Moose\n"
            "https://moose.gr\n"
        ),
    },
}


def log(message):
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    print(f"{stamp} {message}", flush=True)


def validate(payload):
    """Return the cleaned submission fields, or None if invalid."""
    if not isinstance(payload, dict):
        return None

    fields = {}
    for key, max_len in (
        ("firstName", MAX_NAME_LEN),
        ("lastName", MAX_NAME_LEN),
        ("email", MAX_EMAIL_LEN),
        ("message", MAX_MESSAGE_LEN),
    ):
        value = payload.get(key)
        if not isinstance(value, str):
            return None
        value = value.strip()
        # \r/\n in header-bound fields would allow SMTP header injection.
        if not value or len(value) > max_len:
            return None
        if key != "message" and ("\r" in value or "\n" in value):
            return None
        fields[key] = value

    if not EMAIL_RE.match(fields["email"]):
        return None

    fields["lang"] = "el" if payload.get("lang") == "el" else "en"
    return fields


def build_notification(fields, client_ip):
    msg = EmailMessage()
    full_name = f"{fields['firstName']} {fields['lastName']}"
    msg["From"] = formataddr(("Moose Website", SMTP_USER))
    msg["To"] = CONTACT_TO
    msg["Reply-To"] = formataddr((full_name, fields["email"]))
    msg["Subject"] = f"New contact request from {full_name}"
    msg.set_content(
        f"First name: {fields['firstName']}\n"
        f"Last name: {fields['lastName']}\n"
        f"Email: {fields['email']}\n"
        f"\n"
        f"Message:\n"
        f"{fields['message']}\n"
        f"\n"
        f"---\n"
        f"Language: {fields['lang']}\n"
        f"IP: {client_ip}\n"
    )
    return msg


def build_auto_reply(fields):
    template = AUTO_REPLY[fields["lang"]]
    msg = EmailMessage()
    msg["From"] = formataddr(("Moose", SMTP_USER))
    msg["To"] = fields["email"]
    msg["Subject"] = template["subject"]
    # RFC 3834 + Exchange marker: keeps other autoresponders from replying
    # to our auto-reply and starting a mail loop.
    msg["Auto-Submitted"] = "auto-replied"
    msg["X-Auto-Response-Suppress"] = "All"
    msg.set_content(template["body"].format(first_name=fields["firstName"]))
    return msg


def send_emails(fields, client_ip):
    """Send both emails. Raises if the notification cannot be sent; an
    auto-reply failure is logged but never fails the submission."""
    notification = build_notification(fields, client_ip)
    auto_reply = build_auto_reply(fields)

    if SMTP_DRY_RUN:
        print(f"--- DRY RUN notification ---\n{notification}", flush=True)
        print(f"--- DRY RUN auto-reply ---\n{auto_reply}", flush=True)
        return

    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as smtp:
        smtp.starttls(context=context)
        smtp.login(SMTP_USER, SMTP_PASSWORD)
        smtp.send_message(notification)
        try:
            smtp.send_message(auto_reply)
        except Exception as exc:
            log(f"auto-reply to {fields['email']} failed: {exc!r}")


class ContactHandler(BaseHTTPRequestHandler):
    server_version = "moosegr-contact"

    def log_message(self, format, *args):
        pass  # per-submission logging happens in do_POST

    def _respond(self, status, success):
        body = json.dumps({"success": success}).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _client_ip(self):
        return self.headers.get("X-Real-IP") or self.client_address[0]

    def do_POST(self):
        ip = self._client_ip()

        if self.path != "/api/contact":
            self._respond(404, False)
            return

        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY_BYTES:
            self._respond(413 if length > MAX_BODY_BYTES else 400, False)
            return

        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._respond(400, False)
            return

        # Honeypot: bots fill the hidden "website" field. Pretend success
        # so they don't learn the field is a trap.
        if isinstance(payload, dict) and payload.get("website"):
            log(f"honeypot hit from {ip}")
            self._respond(200, True)
            return

        fields = validate(payload)
        if fields is None:
            log(f"invalid submission from {ip}")
            self._respond(400, False)
            return

        try:
            send_emails(fields, ip)
        except Exception as exc:
            log(f"submission from {ip} lang={fields['lang']} failed: {exc!r}")
            self._respond(500, False)
            return

        log(f"submission from {ip} lang={fields['lang']} sent")
        self._respond(200, True)


def main():
    server = ThreadingHTTPServer((BIND_ADDR, BIND_PORT), ContactHandler)
    mode = "dry-run" if SMTP_DRY_RUN else f"smtp={SMTP_HOST}:{SMTP_PORT}"
    log(f"listening on {BIND_ADDR}:{BIND_PORT} ({mode})")
    server.serve_forever()


if __name__ == "__main__":
    main()

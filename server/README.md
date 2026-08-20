# Contact form handler

Self-hosted replacement for Web3Forms. A stdlib-only Python service on the
moose.gr server receives `POST /api/contact` (proxied by nginx), emails the
submission to info@moose.gr (Reply-To set to the visitor), and sends the
visitor a language-matched (EN/EL) auto-reply — both via Google Workspace
SMTP as info@moose.gr.

## One-time setup

1. **App password**: with 2-step verification enabled on info@moose.gr,
   create an app password at <https://myaccount.google.com/apppasswords>.

2. **Copy this directory to the server** (from the repo root):

   ```sh
   ssh moose-svr "mkdir -p ~/moosegr-contact-setup"
   scp -r server/* moose-svr:~/moosegr-contact-setup/
   ```

3. **Run the installer** — it prompts for the app password, installs the
   service + env file + nginx config, and smoke-tests each stage (nginx is
   only touched after the service sends email successfully, and rolls back
   if the new config fails `nginx -t`):

   ```sh
   ssh -t moose-svr "sudo bash ~/moosegr-contact-setup/setup.sh"
   ```

   Expect 2 notifications + 2 auto-replies (EN + EL) at info@moose.gr.
   If the smoke test fails with an auth error, check info@moose.gr for a
   Google security alert about the new sign-in location.

The nginx site config's source of truth is `moosegr.nginx` in this
directory (rate-limit zone in `moosegr-contact-ratelimit.conf`); the
manual equivalent of the installer is documented in the script itself.

## Updating the backend

The auto-reply's HTML design lives in `templates/auto-reply.{en,el}.html`
(`{{first_name}}` is the only placeholder; the plain-text fallback and
subjects stay in `app.py`). To ship backend or template changes:

```sh
scp -r server/app.py server/templates moose-svr:~/moosegr-contact-setup/
ssh -t moose-svr "sudo bash ~/moosegr-contact-setup/update.sh"
```

The site's zip-based deploy to /var/www/moosegr is unrelated and unchanged.

## Local development

```sh
SMTP_DRY_RUN=1 python server/app.py   # prints emails instead of sending
npm run dev                           # vite proxies /api → 127.0.0.1:8321
```

## Operations

- Logs: `journalctl -u moosegr-contact` — one line per submission
  (IP/lang/outcome), honeypot hits, and send failures. Message bodies are
  never logged.
- If Google revokes the app password (account password change, 2FA turned
  off), sends fail with `SMTPAuthenticationError` and visitors see the
  generic error — regenerate the app password and update the env file,
  then `sudo systemctl restart moosegr-contact`.
- Spam: honeypot + 3 requests/min/IP rate limit. If real spam gets
  through, add Cloudflare Turnstile verification.

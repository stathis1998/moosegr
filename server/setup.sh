#!/usr/bin/env bash
# One-time installer for the moose.gr contact form handler.
# Run interactively (it prompts for the Google app password):
#   ssh -t moose-svr "sudo bash ~/moosegr-contact-setup/setup.sh"
# Safe to re-run: overwrites the service/env/nginx files and restarts.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE=/etc/moosegr-contact.env
SITE=/etc/nginx/sites-available/moosegr

[ "$(id -u)" -eq 0 ] || { echo "Run with sudo."; exit 1; }

# 1. SMTP app password — stored only in the root-read-only env file.
read -r -s -p "Google app password for info@moose.gr (spaces ok, they get stripped): " APP_PASSWORD
echo
APP_PASSWORD="${APP_PASSWORD// /}"
[ -n "$APP_PASSWORD" ] || { echo "Empty password, aborting."; exit 1; }

# 2. Service files.
install -d /opt/moosegr-contact
install -m 644 "$DIR/app.py" /opt/moosegr-contact/app.py
install -m 644 "$DIR/moosegr-contact.service" /etc/systemd/system/moosegr-contact.service

# 3. Env file (600, root:root).
umask 077
cat > "$ENV_FILE" <<EOF
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@moose.gr
SMTP_PASSWORD=$APP_PASSWORD
CONTACT_TO=info@moose.gr
BIND_ADDR=127.0.0.1
BIND_PORT=8321
EOF
chown root:root "$ENV_FILE"
chmod 600 "$ENV_FILE"

# 4. Start the service (restart picks up the new env on re-runs).
systemctl daemon-reload
systemctl enable moosegr-contact
systemctl restart moosegr-contact
sleep 1
if ! systemctl is-active --quiet moosegr-contact; then
    echo "Service failed to start:"
    journalctl -u moosegr-contact -n 20 --no-pager
    exit 1
fi

# 5. Smoke test against the service directly — sends a real notification
#    and auto-reply to info@moose.gr. nginx is only touched if this works.
echo "Smoke-testing (sends real emails to info@moose.gr)..."
RESP=$(curl -s -X POST http://127.0.0.1:8321/api/contact \
    -H 'Content-Type: application/json' \
    -d '{"firstName":"Setup","lastName":"Test","email":"info@moose.gr","message":"Backend smoke test - safe to ignore.","lang":"en","website":""}')
echo "response: $RESP"
case "$RESP" in
    *'"success": true'*) ;;
    *)
        echo "FAILED — nginx left untouched. Recent logs:"
        journalctl -u moosegr-contact -n 20 --no-pager
        echo "If this is an auth error, check info@moose.gr for a Google security alert."
        exit 1;;
esac

# 6. nginx: install rate-limit zone + updated site config; roll back if the
#    config doesn't validate.
install -m 644 "$DIR/moosegr-contact-ratelimit.conf" /etc/nginx/conf.d/moosegr-contact-ratelimit.conf
BAK="$SITE.bak-$(date +%Y%m%d%H%M%S)"
cp "$SITE" "$BAK"
install -m 644 "$DIR/moosegr.nginx" "$SITE"
if ! nginx -t; then
    cp "$BAK" "$SITE"
    rm -f /etc/nginx/conf.d/moosegr-contact-ratelimit.conf
    echo "nginx config test failed — restored $BAK"
    exit 1
fi
systemctl reload nginx

# 7. End-to-end through nginx, Greek this time (checks the EL auto-reply too).
RESP=$(curl -s -X POST https://moose.gr/api/contact \
    -H 'Content-Type: application/json' \
    -d '{"firstName":"Setup","lastName":"Test","email":"info@moose.gr","message":"End-to-end smoke test via nginx - safe to ignore.","lang":"el","website":""}')
echo "e2e response: $RESP"

echo
echo "Done. Check info@moose.gr: expect 2 notifications + 2 auto-replies (EN + EL)."
echo "The site itself still posts to Web3Forms until the frontend is deployed."

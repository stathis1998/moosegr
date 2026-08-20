#!/usr/bin/env bash
# Update the deployed backend (app.py + email templates) from this
# directory, without touching the env file or nginx. Normally run from the
# server's git clone after a pull:
#   ssh moose-svr "cd ~/moosegr && git pull"
#   ssh -t moose-svr "sudo bash ~/moosegr/server/update.sh"
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"

[ "$(id -u)" -eq 0 ] || { echo "Run with sudo."; exit 1; }

install -m 644 "$DIR/app.py" /opt/moosegr-contact/app.py
install -d /opt/moosegr-contact/templates
install -m 644 "$DIR"/templates/*.html /opt/moosegr-contact/templates/
systemctl restart moosegr-contact
sleep 1
if ! systemctl is-active --quiet moosegr-contact; then
    echo "Service failed to start:"
    journalctl -u moosegr-contact -n 20 --no-pager
    exit 1
fi
echo "moosegr-contact updated and running."

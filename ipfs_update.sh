#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

: "${LOCHNER_IPNS_KEY_NAME:=lochner-tech}"
: "${LOCHNER_EXPECTED_IPNS_ID:=}"

if [ -z "${IPFS_PATH:-}" ] && [ -n "${IPFS_HOME:-}" ]; then
  export IPFS_PATH="$IPFS_HOME/repo"
fi

if [ -n "${IPFS_BIN:-}" ]; then
  ipfs_bin="$IPFS_BIN"
elif [ -n "${IPFS_HOME:-}" ] && [ -x "$IPFS_HOME/kubo/ipfs" ]; then
  ipfs_bin="$IPFS_HOME/kubo/ipfs"
elif command -v ipfs >/dev/null 2>&1; then
  ipfs_bin="$(command -v ipfs)"
else
  echo "ERROR: ipfs was not found." >&2
  echo "Install Kubo/IPFS, add ipfs to PATH, set IPFS_BIN, or set IPFS_HOME to the directory containing kubo/ipfs." >&2
  exit 127
fi

key_lines="$($ipfs_bin key list -l)"
key_id="$(printf '%s\n' "$key_lines" | awk -v name="$LOCHNER_IPNS_KEY_NAME" '$2 == name { print $1; exit }')"

if [ -z "$key_id" ]; then
  echo "ERROR: IPNS key '$LOCHNER_IPNS_KEY_NAME' was not found in this IPFS repo." >&2
  echo "Available keys:" >&2
  printf '%s\n' "$key_lines" >&2
  echo "Run ./ipfs_publish.sh once to create it, or import/select the key that owns the production IPNS name." >&2
  exit 1
fi

if [ -n "$LOCHNER_EXPECTED_IPNS_ID" ] && [ "$key_id" != "$LOCHNER_EXPECTED_IPNS_ID" ]; then
  echo "ERROR: IPNS key '$LOCHNER_IPNS_KEY_NAME' resolves to '$key_id', not expected '$LOCHNER_EXPECTED_IPNS_ID'." >&2
  echo "Refusing to publish so the production /ipns/$LOCHNER_EXPECTED_IPNS_ID target is not changed with the wrong key." >&2
  exit 1
fi

echo "Building Lochner Technology IPFS bundle"
npm run export:ipfs

CID="$($ipfs_bin add -Qr --cid-version=1 dist-ipfs | tail -n1)"
echo "Pinned CID: $CID"
$ipfs_bin pin add "$CID"

echo "Publishing /ipfs/$CID to /ipns/$key_id using key '$LOCHNER_IPNS_KEY_NAME'"
$ipfs_bin name publish --key="$LOCHNER_IPNS_KEY_NAME" "/ipfs/$CID"

echo
echo "Updated IPFS CID: $CID"
echo "IPNS ID: $key_id"
echo "Local gateway: http://127.0.0.1:8080/ipns/$key_id/"
echo "Public gateway: https://ipfs.io/ipns/$key_id/"

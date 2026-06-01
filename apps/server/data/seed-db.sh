#!/usr/bin/env bash
# Creates an empty kairos.db with the correct schema.
# Requires: sqlite3 CLI  (apt install sqlite3)
#
# To populate with Bible data, use the build-bible-db.ts script
# from the kairos repository, or copy an existing kairos.db here.
set -euo pipefail
cd "$(dirname "$0")"
rm -f kairos.db
sqlite3 kairos.db < schema.sql
echo "Created empty kairos.db at $(pwd)/kairos.db"

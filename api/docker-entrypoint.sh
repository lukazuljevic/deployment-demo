#!/bin/sh
set -euo pipefail

echo "=== Running database migrations ==="
npx prisma migrate deploy

echo "=== Generating Prisma client ==="
npx prisma generate

echo "=== Seeding database ==="
npx prisma db seed

echo "=== Starting backend ==="
exec "$@"
#!/bin/bash

echo "DB Setup Script"

# go to root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# start docker container
echo "🔥Starting docker container"
docker compose -f ./infra/docker/docker-compose.db.yml up -d

# wait for docker container to start
echo "ℹ️ Waiting for docker container to start"
docker compose -f ./infra/docker/docker-compose.db.yml wait

# wait for prisma client to be ready
echo "ℹ️ Waiting for prisma client to be ready"
sleep 3

# run prisma generate
echo "ℹ️ Running prisma generate"
pnpm -F @matrio/db run db:generate

# run prisma migrate
echo "ℹ️ Running prisma migrate"
pnpm -F @matrio/db run db:migrate:deploy

# seed database
echo "ℹ️ Seeding database"
pnpm -F @matrio/db run db:seed

echo "DB Setup Complete"
#!/bin/bash

echo "DB Setup Test Script"

# go to root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# go to infra/docker directory
cd ./infra/docker

# stop all docker containers
for compose_file in *.yml; do
    docker compose -f $compose_file stop
done

# start test container
docker compose -f docker-compose.db.test.yml up -d

# wait for test container to start
docker compose -f docker-compose.db.test.yml wait

# run prisma generate
cd $ROOT_DIR

pnpm -F @matrio/db run db:generate

pnpm -F @matrio/db run db:migrate:deploy

pnpm -F @matrio/db run db:seed

echo "DB Setup Test Complete"

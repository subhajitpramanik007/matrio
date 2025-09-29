#!/bin/bash

echo "DB Reset Script"

# go to root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# stop docker containers
echo "ℹ️ Stopping docker containers"
cd ./infra/docker

# get all docker compose files names and echo them
for compose_file in *.yml; do
echo " - Stopping docker containers for $compose_file"
docker compose -f $compose_file down
done

# remove docker volumes
echo "ℹ️ Removing docker volumes"
for volume in $(docker volume ls -q --filter "name=matrio-db"); do
echo " - Removing volume $volume"
docker volume rm $volume
done

cd $ROOT_DIR/scripts
./db_setup.sh

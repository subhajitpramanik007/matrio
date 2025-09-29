#!/bin/bash

# go to root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# install dependencies
pnpm install

# setup db
./scripts/db_setup.sh

# build packages
pnpm build --filter ./packages/*

echo "run pnpm dev:apps"
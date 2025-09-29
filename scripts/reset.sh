#!/bin/bash

# go to root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# Clean up root directory
if [ -d "$ROOT_DIR/.turbo" ]; then
    echo "[$ROOT_DIR] Deleting .turbo"
    rm -rf "$ROOT_DIR/.turbo"
fi

if [ -d "$ROOT_DIR/node_modules" ]; then
    echo "[$ROOT_DIR] Deleting node_modules"
    rm -rf "$ROOT_DIR/node_modules"
fi

if [ -f "$ROOT_DIR/pnpm-lock.yaml" ]; then
    echo "[$ROOT_DIR] Deleting pnpm-lock.yaml"
    rm -f "$ROOT_DIR/pnpm-lock.yaml"
fi

# Clean up every workspace
for dir in */**/; do
    if [ -d "$dir" ]; then  # Ensuring it's a directory
        echo "[$dir] Processing directory"

        # Delete .turbo
        if [ -d "$dir/.turbo" ]; then
            echo "[$dir] Deleting .turbo"
            rm -rf "$dir/.turbo"
        fi

        # Delete .next
        if [ -d "$dir/.next" ]; then
            echo "[$dir] Deleting .next"
            rm -rf "$dir/.next"
        fi

        # Delete dist
        if [ -d "$dir/dist" ]; then
            echo "[$dir] Deleting dist"
            rm -rf "$dir/dist"
        fi

        # Delete node_modules
        if [ -d "$dir/node_modules" ]; then
            echo "[$dir] Deleting node_modules"
            rm -rf "$dir/node_modules"
        fi

        # Delete pnpm-lock.yaml
        if [ -f "$dir/pnpm-lock.yaml" ]; then
            echo "[$dir] Deleting pnpm-lock.yaml"
            rm -f "$dir/pnpm-lock.yaml"
        fi
    fi
done


# run init_setup.sh
./scripts/init_setup.sh

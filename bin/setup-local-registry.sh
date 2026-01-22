#!/usr/bin/env bash

# Echo every command being executed
set -ex

registry_url=http://localhost:4873

echo "Starting up local npm registry..."

# Start local registry.
tmp_registry_log=`mktemp`

echo "Registry output file: $tmp_registry_log"

curdir=$(dirname "$(realpath $0)")

(cd && nohup npx verdaccio --config "$curdir/verdaccio-config.yml" &>$tmp_registry_log &)

pnpm i --global verdaccio-memory

# Wait for Verdaccio to boot.
grep -q 'http address' <(tail -f $tmp_registry_log)

echo "Local registry up and running! ${registry_url}"

# Set registry to local registry
export NPM_CONFIG_REGISTRY="$registry_url"

echo "Logging in..."

# Log in to Verdaccio so we can publish packages
npx npm-cli-login -u admin -p password -e test@example.com -r $registry_url

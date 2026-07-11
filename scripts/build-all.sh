#!/usr/bin/env bash
# Builds the master site + all three design variants and assembles them
# into one combined dist/ folder for GitHub Pages review:
#
#   dist/                      -> master
#   dist/variants/premium/     -> "Maison Karak" variant
#   dist/variants/editorial/   -> "Editorial Minimal" variant
#   dist/variants/bold/        -> "Electric Karak" variant
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "==> Building master"
npm ci --no-audit --no-fund
rm -rf dist
npm run build

echo "==> Building variants"
for v in premium editorial bold; do
  echo "  -> $v"
  (cd "variants/$v" && npm ci --no-audit --no-fund && rm -rf dist && npm run build)
done

echo "==> Assembling combined dist/"
mkdir -p dist/variants
for v in premium editorial bold; do
  rm -rf "dist/variants/$v"
  cp -r "variants/$v/dist" "dist/variants/$v"
done

echo "==> Done. Combined output is in dist/"
echo "    Deploy it with: npm run deploy:all"

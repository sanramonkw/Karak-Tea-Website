#!/usr/bin/env bash
# Builds the master site (Bold / "Electric Karak" — promoted from
# variants/bold/ on 2026-07-12, so it's no longer a separate variant) + the
# two remaining alternative design variants, and assembles them into one
# combined dist/ folder for GitHub Pages review:
#
#   dist/                      -> master ("Electric Karak" / Bold)
#   dist/variants/premium/     -> "Maison Karak" variant
#   dist/variants/editorial/   -> "Editorial Minimal" variant
#
# Every build runs with DEPLOY_TARGET=pages so astro.config.mjs picks the
# sanramonkw.github.io site + /Karak-Tea-Website/ base (see astro.config.mjs).
# Never set DEPLOY_TARGET for production deploys — production must build
# with the default env (site: https://karaktea.com, base: /).
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "==> Building master"
npm ci --no-audit --no-fund
rm -rf dist
DEPLOY_TARGET=pages npm run build

echo "==> Building variants"
for v in premium editorial; do
  echo "  -> $v"
  (cd "variants/$v" && npm ci --no-audit --no-fund && rm -rf dist && DEPLOY_TARGET=pages npm run build)
done

echo "==> Assembling combined dist/"
mkdir -p dist/variants
for v in premium editorial; do
  rm -rf "dist/variants/$v"
  cp -r "variants/$v/dist" "dist/variants/$v"
done

echo "==> Done. Combined output is in dist/"
echo "    Deploy it with: npm run deploy:all"

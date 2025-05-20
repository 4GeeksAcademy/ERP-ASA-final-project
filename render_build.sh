#!/usr/bin/env bash
# exit on error
set -o errexit

cd src/frontend
npm install
npm run build
cd ../..

pipenv install

pipenv run upgrade
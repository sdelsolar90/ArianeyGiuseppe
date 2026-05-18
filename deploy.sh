#!/usr/bin/env bash
set -euo pipefail

cd /home/arianeygiuseppe/app

echo "Pulling latest changes..."
sudo git pull origin main

echo "Building image..."
sudo docker build --no-cache -t arianeygiuseppe-web .

echo "Restarting container..."
sudo docker compose up -d

echo "Done. Verifying container is running..."
sudo docker compose ps

#!/bin/bash

echo "Starting MongoDB"
docker-compose up -d mongodb

echo "Starting Backend"
cd backend
npm install
node server.js &

echo "Starting Frontend"
cd ../frontend
npm install
npm run dev
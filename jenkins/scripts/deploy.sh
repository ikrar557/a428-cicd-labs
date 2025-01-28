#!/usr/bin/env bash

HOST_URL=$(echo ${EC2_HOST} | cut -d '@' -f2)

ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
    mkdir -p ${DEPLOY_PATH}
    rm -rf ${DEPLOY_PATH}/*
"

scp -r -o StrictHostKeyChecking=no build/* ${EC2_HOST}:${DEPLOY_PATH}/
scp -o StrictHostKeyChecking=no Dockerfile ${EC2_HOST}:${DEPLOY_PATH}/
scp -o StrictHostKeyChecking=no package.json ${EC2_HOST}:${DEPLOY_PATH}/

ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
    echo 'Verifying deployed files:'
    ls -la ${DEPLOY_PATH}
"

ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
    cd ${DEPLOY_PATH}
    docker stop react-app || true
    docker rm react-app || true
    docker build -t react-app .
    docker run -d --name react-app -p 3000:3000 react-app
"

echo "✨ Application deployed successfully!"
echo "🌍 You can now access the application at: http://${HOST_URL}:3000"
echo "⏳ The application will remain accessible for 1 minute."
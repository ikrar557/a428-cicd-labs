#!/usr/bin/env bash
ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
    docker stop react-app
    docker rm react-app
"

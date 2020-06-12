#!/bin/bash
docker kill auditor
docker rm auditor
docker build -t res/auditor ./docker/image-auditor
docker run -d -p 2205:2205 --name auditor res/auditor


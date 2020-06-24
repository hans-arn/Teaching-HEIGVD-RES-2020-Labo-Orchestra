#!/bin/bash
docker kill auditor
docker rm auditor
docker build -t res/auditor ./docker/image-auditor
docker run -p 2205:2205 res/auditor


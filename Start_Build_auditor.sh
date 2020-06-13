#!/bin/bash
docker kill auditor
docker rm auditor
docker build -t res/auditor ./docker/image-auditor
docker run -p 2205:2205 --name auditor res/auditor
export STATIC_APP1=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' auditor)
echo "ip auditeur: $STATIC_APP1"


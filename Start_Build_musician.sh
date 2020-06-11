#!/bin/bash
docker kill musician
docker rm musician
docker build -t res/musician ./docker/image-musician
docker run --name musician res/musician flute

#!/bin/bash
docker kill flute piano trumpet violin drum
docker rm flute piano trumpet violin drum
docker build -t res/musician ./docker/image-musician
docker run -d --name flute res/musician flute
docker run -d --name piano res/musician piano
docker run -d --name trumpet res/musician trumpet
docker run -d --name violin res/musician violin
docker run -d --name drum res/musician drum

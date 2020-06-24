#!/bin/bash
docker kill flute piano trumpet violin drum
docker rm flute piano trumpet violin drum
docker build -t res/musician ./docker/image-musician
docker run -d  res/musician flute
docker run -d  res/musician piano
docker run -d  res/musician trumpet
docker run -d  res/musician violin
docker run -d  res/musician drum

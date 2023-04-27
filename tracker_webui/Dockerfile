FROM node:18-bullseye-slim

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

RUN npm install -g http-server

WORKDIR /tracker

COPY package*.json ./

RUN npm ci --location=project

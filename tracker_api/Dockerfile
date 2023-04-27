FROM node:18-bullseye-slim

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /tracker

RUN npm i pm2 --location=global

COPY ./package*.json /tracker

RUN npm ci --location=project

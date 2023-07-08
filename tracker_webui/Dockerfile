# STAGE-1

FROM node:18-bullseye-slim AS webui-build

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /tracker

COPY package*.json ./

RUN npm ci --location=project

COPY . .

RUN npm run build

# STAGE-2 

FROM node:18-bullseye-slim

RUN npm install -g serve

WORKDIR /tracker

RUN ls

COPY --from=webui-build tracker/dist .

FROM node:16-alpine3.15

WORKDIR /app
COPY package.json package-lock.json /app/

RUN apk add --no-cache git
RUN npm install

ENV TZ=America/Campo_Grande
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /app

RUN mkdir -p /root/.node_modules/.adminjs && chmod -R 777 /root/.node_modules/.adminjs

EXPOSE 3000
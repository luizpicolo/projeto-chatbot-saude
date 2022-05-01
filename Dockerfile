FROM node:18-alpine

RUN mkdir /app

WORKDIR /app
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install

ADD . /app

EXPOSE 3000
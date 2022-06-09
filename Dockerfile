FROM node:18-alpine3.15

RUN mkdir /app

WORKDIR /app
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install
# RUN npm install -g npm@8.12.1

ADD . /app

EXPOSE 3000
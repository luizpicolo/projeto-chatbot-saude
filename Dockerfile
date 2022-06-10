FROM node:18-alpine3.15

RUN mkdir /app

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install


ADD . /app

EXPOSE 3000
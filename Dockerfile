FROM node:16-alpine3.15

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN apk add --no-cache git
RUN yarn install

ENV TZ=America/Campo_Grande
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /app

EXPOSE 3000
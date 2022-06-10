FROM node:18-alpine3.15

RUN mkdir /app

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install

ENV TZ=America/Campo_Grande
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD . /app

EXPOSE 3000
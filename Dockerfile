FROM node:16-alpine3.15

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache git \
  && npm ci --only=production

ENV TZ=America/Campo_Grande
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

CMD ["npm", "start"]

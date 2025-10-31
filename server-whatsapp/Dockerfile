FROM node:18-bullseye

# Instala dependências do Chromium necessárias para puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libgbm-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Variável para o Chromium
ENV CHROME_PATH=/usr/bin/chromium

# Expondo porta (opcional)
EXPOSE 50051

CMD ["node", "server.js"]

FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY static ./static/
COPY server.js ./

CMD [ "npm", "run", "serve" ]
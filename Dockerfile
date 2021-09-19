FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY static ./static/
COPY server.js ./

EXPOSE 6969
CMD [ "npm", "run", "serve" ]
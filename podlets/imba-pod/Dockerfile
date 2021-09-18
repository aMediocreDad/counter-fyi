FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY ./app ./app/
COPY ./__services__ ./__services__/
COPY index.js ./
COPY server.imba ./

EXPOSE 7300
CMD ["npm", "start"]

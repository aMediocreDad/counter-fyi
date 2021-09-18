FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY ./src ./src/
COPY ./__services__ ./__services__/
COPY index.js ./
COPY rollup.config.js ./

EXPOSE 7100
CMD ["npm", "start"]
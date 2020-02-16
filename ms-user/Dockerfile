FROM node:12.15-alpine

WORKDIR /usr/src/app

RUN apk add --update bash

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "src/index.js"]

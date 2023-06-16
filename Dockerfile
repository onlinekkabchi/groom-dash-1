# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 8080

FROM node:19-alpine3.16


WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm install -g create-react-app
RUN npm install react-router-dom
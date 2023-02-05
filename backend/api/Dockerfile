FROM node:alpine

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 8080
CMD [ "npm", "start" ]
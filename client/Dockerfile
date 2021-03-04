FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /home/app

COPY . .

RUN npm install

COPY ./dist .

EXPOSE 8080

RUN npm run build

CMD [ "http-server", "dist" ]

FROM node:latest

WORKDIR /app
EXPOSE 3333

COPY package.json yarn.lock ./
RUN touch .env

RUN set -x && yarn

COPY . .

CMD [ "yarn", "start:prod" ]

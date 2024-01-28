FROM node:latest

WORKDIR /app


COPY package.json yarn.lock ./
RUN touch .env

RUN set -x && yarn

COPY . .

CMD [ "yarn", "start:prod" ]
EXPOSE 3001
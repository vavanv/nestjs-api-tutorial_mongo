# FROM node:latest
# WORKDIR /app
# EXPOSE 3001

# COPY package.json yarn.lock ./
# RUN touch .env

# RUN set -x && yarn

# COPY . .

# CMD [ "yarn", "start:prod" ]

FROM node:latest AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn -g rimraf

RUN yarn --dev

COPY . .

RUN yarn build

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
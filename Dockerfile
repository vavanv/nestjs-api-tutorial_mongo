FROM node:20.10.0 AS development

#  Navigate to the container working directory
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN yarn -g rimraf

RUN yarn --network-timeout 100000

COPY . .
RUN yarn build

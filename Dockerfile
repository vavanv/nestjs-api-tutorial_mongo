FROM node:20.10.0 AS development

#  Navigate to the container working directory
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

# RUN yarn -g rimraf
RUN npm install glob rimraf
# RUN yarn
RUN npm install --legacy-peer-deps
COPY . .
# RUN yarn build
RUN npm run build
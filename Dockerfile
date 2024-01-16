FROM node:latest

RUN mkdir -p /app

# App directory
WORKDIR /app

# App dependencies
COPY package.json /app
RUN npm i

# Copy app source code
COPY . /app

# Env setup
# COPY .env.example /app/.env

RUN npm run build

#Expose port and begin application
EXPOSE 9001

# Start the app
CMD [ "npm", "run", "start:dev"]
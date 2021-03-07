#  Dockerfile for Node Express Server

# PRODUCTION CONFIG

FROM node:15.10-alpine as prod

# Create App Directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client

# Server working directory be /usr/src/app
WORKDIR /usr/src/app

# Copy package files to /usr/src/app
COPY package*.json ./

# Install Dependencies
RUN npm install --silent

# Client working directory be /usr/src/app/client
WORKDIR /usr/src/app/client

# Copy package files to /usr/src/app
COPY ../client/package*.json ./

# Install Dependencies
RUN npm install --silent

# copy local files to app folder
WORKDIR /usr/src/app
COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]

# DEV CONFIG
FROM prod as dev

EXPOSE 5000 3000

ENV NODE_ENV=development

RUN npm install -g nodemon
RUN npm install --only=dev

CMD [ "npm", "run", "dev" ]
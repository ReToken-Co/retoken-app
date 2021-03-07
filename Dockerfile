#  Dockerfile for Node Express Server

# PRODUCTION CONFIG

FROM node:15.10-alpine

# Create App Directory
RUN mkdir -p /app
RUN mkdir -p /app/client

# Server working directory be /app
WORKDIR /app

# Copy package files to /usr/src/app
COPY ./server/package*.json ./

# Install Dependencies
RUN npm install --silent

# Client working directory be /usr/src/app/client
WORKDIR /app/client

# Copy package files to /usr/src/app
COPY ./client/package*.json ./

# Install Dependencies
RUN npm install --silent

# copy local files to app folder
WORKDIR /app
COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]

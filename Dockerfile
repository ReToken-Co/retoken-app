#  Dockerfile for Node Express Server

# PRODUCTION CONFIG

FROM node:15.10-alpine

# Create App Directory
# RUN mkdir -p /app
# RUN mkdir -p /app/client

# Server working directory be /app
WORKDIR /usr/local/bin/web

# Copy package files to /usr/src/app
COPY . /usr/local/bin/web

# Install Dependencies
RUN npm install --silent

# Install Dependencies and build client
RUN npm install --prefix client --silent
RUN npm run --prefix client build

ENV NODE_ENV=production

CMD ["npm", "start"]

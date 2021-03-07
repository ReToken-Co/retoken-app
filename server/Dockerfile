#  Dockerfile for Node Express Server

FROM node:15.10-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
# Working directory be app
WORKDIR /usr/src/app

# Copy package files to /usr/src
COPY package*.json ./

# Install Dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .

# Expose port
EXPOSE 5000

CMD ["npm", "start"]

# Dockerfile for React client

# Build react client
FROM node:15.10-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
# Working directory be app
WORKDIR /usr/src/app

# Copy package files to /usr/src
COPY package*.json ./

# Install Dependencies
RUN npm install --silent
# RUN npm install react-scripts -g --silent

# copy local files to app folder
COPY . .

# Expose port
EXPOSE 3000

CMD ["npm", "start"]
# Stage 1: Run tests
FROM node:20 as test

# Install Chrome for Karma
RUN apt-get update && apt-get install -y wget gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the container
COPY ./*.* ./
COPY ./src/ ./src/

# Install dependencies
RUN npm install && npm install -g @angular/cli

# Modify Karma configuration to use ChromeHeadless with --no-sandbox
#RUN sed -i 's|ChromeHeadless|ChromeHeadless --no-sandbox|' karma.conf.js

# Run tests
RUN ng test --watch=false

# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the container
COPY ./*.* ./
COPY ./src/ ./src/

# Install dependencies
RUN npm install

# Build the Angular app
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Remove source code
RUN rm -rf src

# Expose port 80 and 443 for the Node server
EXPOSE 80
EXPOSE 443

# Start the Node server
CMD ["npm", "start"]

# Use an official Node runtime as a parent image
FROM node:18

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

# Expose port 3000 for the Node server
EXPOSE 80
EXPOSE 443

# Start the Node server
CMD ["npm", "start"]

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
#FROM node:latest as build

# Set the working directory
#WORKDIR /usr/local/app

# Add the source code to app
#COPY ./ /usr/local/app/

# Install all the dependencies
#RUN npm install

# Generate the build of the application
#RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Create a directory to store the SSL certificate files
RUN mkdir /etc/nginx/ssl

# Copy the SSL certificate files to the container
COPY ./ssl/linkiez_ddns_net.crt /etc/nginx/ssl/linkiez_ddns_net.crt
COPY ./ssl/linkiez_ddns_net.key /etc/nginx/ssl/linkiez_ddns_net.key
COPY ./ssl/DigiCertCA.crt /etc/nginx/ssl/DigiCertCA.crt
COPY ./ssl/TrustedRoot.crt /etc/nginx/ssl/TrustedRoot.crt

# Copy the nginx configuration file to the default nginx configuration path
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY ./dist/jcmfront2 /usr/share/nginx/html

# Expose the HTTPS port
EXPOSE 443
EXPOSE 80

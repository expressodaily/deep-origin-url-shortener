# Use Node.js LTS as the base image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the backend runs on
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "dev"]

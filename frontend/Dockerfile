# Use the official Node.js image as a base
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose port 5173
EXPOSE 5173

# Start the React app using npm
CMD ["npm", "run", "dev", "--", "--host"]

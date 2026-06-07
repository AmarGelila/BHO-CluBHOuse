# Use the official Node.js long-term support (LTS) image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's cache behavior
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of your application source code
COPY . .

# Expose the port your app runs on (Back4app assigns this dynamically)
EXPOSE 3000

# Start the application using your package.json start script
CMD ["npm", "start"]
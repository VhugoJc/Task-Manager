# Use a Node.js base image
FROM node:18.20.4-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose the port your React app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
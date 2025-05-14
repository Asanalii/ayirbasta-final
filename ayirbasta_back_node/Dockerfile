# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Set environment variable (optional, default handled in .env)
ENV PORT=8080

# Expose the port your app runs on
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
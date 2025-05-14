# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies safely (avoids peer conflict issues)
RUN npm install --legacy-peer-deps --production

# Copy the rest of the code
COPY . .

# Set environment variables (optional)
ENV PORT=8080

# Expose backend port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

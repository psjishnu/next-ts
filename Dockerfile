# Use official Node.js image (version 18)
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]

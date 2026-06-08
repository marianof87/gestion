# Build and run stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package configuration
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy sources
COPY src ./src

# Build the TypeScript project
RUN npm run build

# Command to execute the app
CMD ["node", "dist/index.js"]

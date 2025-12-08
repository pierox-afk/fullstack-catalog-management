# syntax=docker/dockerfile:1

# Base image
FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy source
COPY . .

# Build (if using TS build step) and set start command
RUN npm run build || true
CMD ["node", "dist/main.js"]

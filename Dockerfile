# syntax=docker/dockerfile:1

# Base image
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Install all deps (including dev) to build the project
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source and build
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

CMD ["node", "dist/main.js"]

# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
# This runs 'vite build' and 'esbuild server/index.ts'
RUN pnpm build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Install pnpm to handle prod dependencies
RUN npm install -g pnpm@10.4.1

# Set to production
ENV NODE_ENV=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/patches ./patches

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose the port (matches the port in server/index.ts)
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]

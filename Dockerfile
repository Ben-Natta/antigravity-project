# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# --- จุดที่แก้ไข: ก๊อปปี้ patches เข้าไปด้วยเพื่อป้องกัน ENOENT Error ---
COPY patches ./patches 

# Install dependencies (รวม patches ด้วย)
RUN pnpm install --frozen-lockfile

# Copy source code ทั้งหมด
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Install pnpm สำหรับรัน production dependencies
RUN npm install -g pnpm

# Set to production
ENV NODE_ENV=production

# Copy เฉพาะไฟล์ที่จำเป็นมาจาก builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
# ก๊อปปี้ patches มาด้วยกรณีที่ production dependencies ต้องใช้
COPY --from=builder /app/patches ./patches 

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# เปิดพอร์ต 5000 ตามที่แอปกำหนด
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]

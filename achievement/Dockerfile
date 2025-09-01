FROM node:20-bookworm-slim
WORKDIR /app

# Install OpenSSL (needed by Prisma)
RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

# install deps
COPY package*.json ./
RUN npm install

# prisma: copy schema and generate client (so TS sees enums like Role)
COPY prisma ./prisma
RUN npx prisma generate

# build TS
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Copy startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

ENV NODE_ENV=production
# Use the startup script
CMD ["./start.sh"]
ENV PRISMA_CLIENT_ENGINE_TYPE=wasm

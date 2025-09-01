FROM node:20-bookworm-slim
WORKDIR /app

# Install OpenSSL (needed by Prisma)
RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

# install deps
COPY package*.json ./
RUN npm install

# build TS
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]

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

ENV NODE_ENV=production
# run migrations or push, then optional seed, then start
CMD ["sh","-c","(npx prisma migrate deploy || npx prisma db push) && (npx prisma db seed || true) && npm start"]
ENV PRISMA_CLIENT_ENGINE_TYPE=wasm

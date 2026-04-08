FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY packages/types/ ./packages/types/
COPY services/api/package*.json ./services/api/

RUN npm install

COPY services/api ./services/api

WORKDIR /app/services/api
RUN npx prisma generate
WORKDIR /app
RUN npm run build --workspace=packages/types && npm run build --workspace=services/api

FROM node:20-slim AS production

WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/types/package.json ./packages/types/
COPY --from=builder /app/services/api/package.json ./services/api/

RUN npm ci --omit=dev

COPY --from=builder /app/services/api/dist ./services/api/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/services/api/prisma ./services/api/prisma

COPY services/api/docker-entrypoint.sh .
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh","./docker-entrypoint.sh"]

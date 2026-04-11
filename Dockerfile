FROM node:20
WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./services/api/package.json ./services/api/package.json
COPY ./services/api/package-lock.json ./services/api/package-lock.json
COPY ./services/web/package.json ./services/web/package.json
COPY ./services/api/prisma ./services/api/prisma

RUN npm install

COPY . .

RUN npx prisma generate --schema=services/api/prisma/schema.prisma

RUN npm run build

CMD node services/api/dist/src/main.js

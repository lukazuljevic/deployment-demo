FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["sh","./docker-entrypoint.sh"]

EXPOSE 3000

CMD ["npm","run","start:dev"]
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/types/ ./packages/types/
COPY services/web/package*.json ./services/web/

RUN npm install

COPY services/web ./services/web
RUN npm run build --workspace=packages/types && npm run build --workspace=services/web

FROM nginx:1.17.8-alpine AS production

COPY --from=builder /app/services/web/dist /usr/share/nginx/html
COPY --from=builder /app/packages/types/dist /usr/share/nginx/html/packages/dist

RUN rm /etc/nginx/conf.d/default.conf
COPY ./services/web/nginx.conf /etc/nginx/default.conf

RUN echo 'server { listen 80; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]
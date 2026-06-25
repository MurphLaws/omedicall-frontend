# Build de Angular y servido con Nginx.
FROM node:22-alpine AS build
WORKDIR /app
# URL del API. Por defecto apunta al backend local; en despliegue se pasa con --build-arg.
ARG API_BASE=http://localhost:5000
COPY package*.json ./
RUN npm ci
COPY . .
RUN sed -i "s#http://localhost:5000#${API_BASE}#g" src/app/core/config.ts
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/omedicall-frontend/browser /usr/share/nginx/html
EXPOSE 80

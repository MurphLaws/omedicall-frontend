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
# nginx.conf es una plantilla: la imagen sustituye ${PORT} al arrancar (envsubst).
# Railway inyecta su propio PORT; localmente cae al valor por defecto de abajo.
ENV PORT=80
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/omedicall-frontend/browser /usr/share/nginx/html
EXPOSE 80

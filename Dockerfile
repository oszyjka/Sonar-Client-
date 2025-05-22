FROM node:20.11.1-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL=http://server:8080
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build phase
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Production phase
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
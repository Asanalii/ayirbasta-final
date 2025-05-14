# Build phase
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Serve with NGINX
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 80



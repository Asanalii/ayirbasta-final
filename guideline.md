# Ayirbasta Deployment Guide (DigitalOcean + Docker Swarm)

## 1. Create & Set Up a DigitalOcean Droplet

1. Go to https://cloud.digitalocean.com
2. Click **"Create" → Droplet**
3. Choose:
   - Image: Ubuntu 22.04 (x64)
   - Plan: Basic Shared CPU
   - Authentication: Add your **SSH key**
   - Datacenter: Choose nearest region
4. Click **Create Droplet**

## 2. Connect to Server via SSH (master node)

ssh root@138.197.190.30

## 3. Install Dependencies

apt update && apt upgrade -y
apt install docker.io docker-compose git -y
systemctl enable docker

## 4. Initialize Docker Swarm

docker swarm init

## 5. Clone Project

mkdir -p ~/deploy/ayirbasta-final
cd ~/deploy/ayirbasta-final
git clone https://github.com/Asanalii/ayirbasta-final.git .

## 6. Project Structure

ayirbasta-final/
├── ayirbasta_back_node/
├── client/
├── nginx/default.conf
├── docker-compose.yml
└── .github/workflows/deploy.yml

## 7. Backend Image Build & Push

docker build -t asanalii/ayirbasta-backend:latest ./ayirbasta_back_node
docker push asanalii/ayirbasta-backend:latest

## 8. Build Frontend Locally

docker build -t asanalii/ayirbasta-frontend:latest ./client
docker push asanalii/ayirbasta-frontend:latest

## 9. nginx/default.conf

server {
listen 80;
location / {
proxy_pass http://frontend:80;
}

    #Proxy_pass it, when nginx goes to frontend image
    #try_files it, when nginx searches the html and so on, inside directories.

    location /v1/ {
        proxy_pass http://backend:8080/v1/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

}

## 10. docker-compose.yml

```yaml
version: "3.8"

services:
  nginx:
    image: nginx:alpine
    ports:
      - "8081:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - backend
    networks:
      - app-net
    deploy:
      replicas: 1

  backend:
    image: asanalii/ayirbasta-backend:latest
    environment:
      - MONGO_URI=<your-mongo-uri>
    networks:
      - app-net
    deploy:
      replicas: 1

networks:
  app-net:
    driver: overlay
```

## 11. Deploy with Docker Swarm

docker stack deploy -c docker-compose.yml ayirbasta

## 12. GitHub Actions CI/CD Workflow (.github/workflows/deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Docker login
        run: echo "${{ secrets.DOCKERHUB_PASSWORD }}" | docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" --password-stdin
	- name: Build & Push backend
        run: |
          docker build -t asanalii/ayirbasta-backend:latest ./ayirbasta_back_node
          docker push asanalii/ayirbasta-backend:latest

      - name: Build & Push frontend
        run: |
          docker build -t asanalii/ayirbasta-frontend:latest ./client
          docker push asanalii/ayirbasta-frontend:latest

      - name: SSH Deploy
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SSH_HOST }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/deploy/ayirbasta-final
            git pull origin master
            docker stack deploy -c docker-compose.yml ayirbasta


## 13. GitHub Secrets Required

- `SSH_HOST = 138.197.190.30`
- `SSH_PRIVATE_KEY = your private key`
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_PASSWORD`


## 14. Access App

http://64.226.119.110:8081

```

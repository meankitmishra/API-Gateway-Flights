FROM node:latest

WORKDIR /user

COPY package*.json ./
RUN npm ci

COPY . .
RUN chmod +x ./entrypoint.sh

EXPOSE 3000
CMD ["./entrypoint.sh"]


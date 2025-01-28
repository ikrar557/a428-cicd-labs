FROM node:16-buster-slim
WORKDIR /app
COPY package*.json ./
RUN npm install -g serve
COPY . ./
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
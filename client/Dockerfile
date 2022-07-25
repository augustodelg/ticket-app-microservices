FROM node:14.19.3-alpine3.15

WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .

CMD ["npm","run", "dev"]
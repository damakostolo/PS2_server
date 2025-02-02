FROM node:20.9-alpine

WORKDIR /app

COPY package*.json ./

RUN npm installAqa

COPY . .

CMD ["npm", "run", "start:dev"]
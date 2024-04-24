FROM node:21-alpine3.18

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --silent --progress=false --production

COPY ./services/logger.service.js /app/services/logger.service.js 
COPY ./shared /app/shared
COPY moleculer.config.js /app/moleculer.config.js

CMD ["npm", "start"]
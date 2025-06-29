FROM node:lts-alpine3.21

WORKDIR /server

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]

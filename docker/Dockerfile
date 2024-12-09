FROM --platform=linux/amd64 node:22-alpine3.19

WORKDIR /app

COPY ./src ./src
COPY ./.env ./
COPY ./package.json ./

RUN npm i

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
FROM --platform=linux/amd64 node:22-alpine3.19

WORKDIR /app

COPY ./src ./src
COPY ./package.json ./

RUN npm i

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "k8s" ]
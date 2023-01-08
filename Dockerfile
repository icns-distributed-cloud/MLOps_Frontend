FROM node:lts-alpine as build-stage
WORKDIR /MLOps_Frontend
COPY package.json .

ADD . .
RUN npm install
EXPOSE 8081

ENTRYPOINT ["npm", "run", "serve"]

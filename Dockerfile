FROM node:16.13.0-alpine 
#python:3.10 
# install simple http server for serving static content

RUN npm install -g http-serve
WORKDIR /khu-data-studio-ui
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json .

ADD . .
RUN npm install
RUN npm run build
EXPOSE 8082
ENTRYPOINT ["npm", "run", "serve"]
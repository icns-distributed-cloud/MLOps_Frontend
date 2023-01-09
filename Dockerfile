FROM node:lts-alpine 
#python:3.10 
# install simple http server for serving static content

RUN npm install -g http-serve
WORKDIR /MLOps_Frontend
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

#COPY package.json .

#ADD . .
# RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm run build
EXPOSE 8082
ENTRYPOINT ["npm", "run", "serve"]
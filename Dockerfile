FROM ubuntu 
#python:3.10 
WORKDIR /MLOps_Frontend
COPY package.json .

ADD . .
RUN npm install
EXPOSE 8082

ENTRYPOINT ["npm", "run", "serve"]
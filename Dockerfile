FROM ubuntu 
#python:3.10 
WORKDIR /root
COPY package.json .

ADD . .
RUN apt-get update && apt-get upgrade -y
RUN npm install
EXPOSE 8082

ENTRYPOINT ["npm", "run", "serve"]
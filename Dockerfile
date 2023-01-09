FROM python:3.10 
WORKDIR /root
COPY package.json .

ADD . .
RUN npm install
EXPOSE 8082

ENTRYPOINT ["npm", "run", "serve"]
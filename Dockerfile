FROM node:lts-alpine as build-stage
WORKDIR /MLOps_Frontend
COPY package*.json ./
RUN npm install --production
COPY . .
RUN /bin/sh -c yarn run build
RUN npm run build

# FROM appleboy/drone-ssh:1.6.4-linux-amd64

#ENV APP_HOME=/usr/app/
#WORKDIR $APP_HOME

ADD ./build/libs/MLOpsPro-0.0.1-SNAPSHOT.jar MLOpsPro-0.0.1-SNAPSHOT.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "MLOpsPro-0.0.1-SNAPSHOT.jar"]
#CMD ["java", "-jar", "Admin-0.0.1-SNAPSHOT.jar"]

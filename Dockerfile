#build stage
FROM node:lts-alpine as build-stage
EXPOSE 8082
WORKDIR /App
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

#production stage
# FROM nginx:stable-alpine
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 8082

# ENTRYPOINT ["nginx", "-g", "daemon off;"]

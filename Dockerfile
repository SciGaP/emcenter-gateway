# build stage
FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN yarn install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
EXPOSE 8080 443
ENTRYPOINT [ "/entrypoint.sh" ]
#CMD ["nginx", "-g", "daemon off;"]
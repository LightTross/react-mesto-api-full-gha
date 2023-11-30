FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json

RUN npm install --only=prod
COPY . /app

RUN npm run build
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /mesto-frontend
COPY --from=build /app/mesto-frontend.conf /etc/nginx/conf.d/

RUN ["/bin/sh", "-c", "cd app; ls -la"]
RUN ["/bin/sh", "-c", "mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default"]
#COPY /app/mesto-frontend.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

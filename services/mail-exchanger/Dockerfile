FROM node:16-alpine AS build
COPY . /opt/app
WORKDIR /opt/app
RUN npm i
RUN ./node_modules/.bin/lerna bootstrap
RUN ./node_modules/.bin/lerna run build
WORKDIR /opt/app/services/mail-exchanger
CMD ["node", "."]

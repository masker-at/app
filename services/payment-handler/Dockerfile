FROM node:16 AS build
COPY . /opt/app
WORKDIR /opt/app
RUN npm i
RUN ./node_modules/.bin/lerna bootstrap
RUN ./node_modules/.bin/lerna run build


FROM gcr.io/distroless/nodejs:16
COPY --from=build /opt/app/ /opt/app/
WORKDIR /opt/app/services/payment-handler
CMD ["dist/index.js"]
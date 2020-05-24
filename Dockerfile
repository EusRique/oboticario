FROM node:12
WORKDIR /usr/src/oboticario
COPY ./package.json .
RUN npm install --only=prod
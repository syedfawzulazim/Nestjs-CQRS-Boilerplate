FROM node:18.14.1-alpine3.16

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "start:dev"]
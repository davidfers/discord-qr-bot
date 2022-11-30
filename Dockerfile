FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "yarn.lock*", "./"]
RUN yarn install \
  && yarn cache clean

COPY . .

CMD [ "yarn", "dev" ]

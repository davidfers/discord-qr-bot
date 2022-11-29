FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "yarn.lock*", "./"]
RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]

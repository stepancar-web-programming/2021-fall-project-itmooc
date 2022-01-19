FROM node:12
COPY . /app
WORKDIR /app

RUN yarn install

RUN yarn lint:fix

EXPOSE 3000

CMD ["yarn", "start"]
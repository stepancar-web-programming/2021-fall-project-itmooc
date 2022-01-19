FROM node:14
COPY . /app
WORKDIR /app

RUN yarn install

RUN yarn lint:fix

EXPOSE 4001

CMD ["yarn", "start"]
FROM node:24-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn global add serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
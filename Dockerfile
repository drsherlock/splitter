FROM node:lts-alpine

WORKDIR /usr/splitter

COPY package.json .
COPY yarn.lock .

RUN yarn install
    
COPY . .

RUN yarn build

CMD ["yarn", "start"]



FROM node:20

WORKDIR /usr/src/app

COPY package.json

expose 3000

CMD ["node", "index.js"]

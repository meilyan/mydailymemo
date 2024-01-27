FROM node:20

WORKDIR 

COPY package*.json  ./

expose 3000

CMD ["node", "index.js"]

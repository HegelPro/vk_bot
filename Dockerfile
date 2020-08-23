FROM node:carbon

WORKDIR /app

COPY . ./

RUN npm install


CMD [ "npm", "start" ]
FROM node:latest

WORKDIR /e_cell_webiste

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
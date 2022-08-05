FROM node:14.17.3 

EXPOSE 8000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install react-scripts@5.0.1 -g
RUN npm install

COPY . ./

ENTRYPOINT ["npm","start"]


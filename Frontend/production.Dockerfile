FROM node as client-app
LABEL authors="Juan Castillo"
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --silent
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm","start"]

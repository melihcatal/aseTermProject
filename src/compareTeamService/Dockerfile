FROM node:12.18-alpine
ENV NODE_ENV=production
ENV MONGO_IP=mongo:27017
ENV MONGOMS_ARCH=x64
ENV MONGO_DATABASE=fifa
ENV FIELD_BACK_COEF=2.47
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

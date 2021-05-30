FROM node:12.18-alpine
ENV NODE_ENV=production
ENV MONGO_IP=mongo:27017
ENV MONGO_DATABASE=fifa
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

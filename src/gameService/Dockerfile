FROM node:12.18-alpine
ENV NODE_ENV=production
ENV MONGO_IP=mongo:27017
ENV MONGOMS_ARCH=x64
ENV MONGO_DATABASE=fifa
ENV FOOTBALL_API_KEY=18b439b0ebmshed340a43642ea75p19f1a8jsnd340f8473b24
ENV FOOTBALL_API_HOST=api-football-v1.p.rapidapi.com
ENV FOOTBALL_API_TIMEZONE=Europe/Zurich
ENV FIELD_BACK_COEF=2.47
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

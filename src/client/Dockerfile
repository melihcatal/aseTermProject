FROM node:12.18-alpine
WORKDIR /usr/src/app
ENV REACT_APP_FIELD_BACK_COEF=2.47
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

FROM node:17-alpine
WORKDIR /home/app

COPY ./ ./

RUN npm install
RUN npm run build

COPY ./ ./

EXPOSE 8080
CMD ["node", "build/index.js"]

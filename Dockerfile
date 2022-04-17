FROM node:16-alpine3.11 as build-deps
ENV NODE_ENV=production
WORKDIR /app
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client ./
RUN npm run build

FROM node:16-alpine3.11
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build-deps /app/build /build
COPY ./client-server/package*.json .
RUN npm install
COPY ./client-server/index.js .
EXPOSE 80
CMD ["npm", "start"] 
FROM ubuntu:latest as build
RUN apt -y update
RUN apt -y install nodejs npm
WORKDIR /src
COPY ./web /src/web
WORKDIR /src/web
RUN npm install -g typescript
RUN npm install
RUN npm rebuild node-sass --force
RUN npm run-script ng build
WORKDIR /src
COPY ./server /src/server
WORKDIR /src/server
RUN npm install
RUN npm run build

FROM ubuntu:latest as final
RUN apt -y update
RUN apt -y install nodejs npm
COPY --from=build /src/server/build /server
COPY --from=build /src/server/package.json /server
COPY --from=build /src/server/package-lock.json /server
WORKDIR /server
RUN npm install

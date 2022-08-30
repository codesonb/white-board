FROM node:17.2-alpine AS base

WORKDIR /app/wb-ui
RUN npm i serve -g

#----------------------------------------
FROM base

WORKDIR /app/wb-ui
ENTRYPOINT ["serve", "-s", "build", "-l", "80"]

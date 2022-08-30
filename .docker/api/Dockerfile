FROM maven:3.8.6-jdk-11-slim AS base

COPY ./target/whiteboard-api.jar /app/wb-api/whiteboard-api.jar
WORKDIR /app/wb-api

ENTRYPOINT ["java", "-jar", "whiteboard-api.jar"]

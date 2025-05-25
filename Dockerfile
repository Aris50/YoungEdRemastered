# Build stage
FROM maven:latest AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY --from=build /app/target/youngedremastered-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/application.properties application.properties
LABEL authors="arisoniga"
ENTRYPOINT ["java", "-jar", "/app.jar"]
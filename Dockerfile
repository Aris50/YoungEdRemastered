FROM openjdk:21-jdk-slim
VOLUME /tmp
COPY target/youngedremastered-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/application.properties application.properties
LABEL authors="arisoniga"
EXPOSE 3306
ENTRYPOINT ["java", "-jar", "/app.jar"]
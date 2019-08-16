FROM openjdk:8-jre-slim

EXPOSE 8000

ENV SPRING_PROFILES_ACTIVE=dev

ADD ./target/gateway-0.0.1.jar /app/app.jar
CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar","/app/app.jar"]
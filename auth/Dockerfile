FROM openjdk:8-jre-slim

EXPOSE 8001

ENV SPRING_PROFILES_ACTIVE=dev

ADD ./target/auth-0.0.1.jar /app/app.jar
CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar","/app/app.jar"]
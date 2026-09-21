# ============================================================================
# CIVICFIX BACKEND — PRODUCTION DOCKERFILE (Multi-Stage Build)
# ============================================================================

# Stage 1: Build JAR package
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
# Cache dependencies
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Minimal Production Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root system group and user for security
RUN addgroup -S civicfix && adduser -S civicfix -G civicfix
USER civicfix

# Create directory for photo evidence uploads
RUN mkdir -p uploads

COPY --from=builder /app/target/civicfix-backend-*.jar app.jar

EXPOSE 8081

ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar --spring.profiles.active=prod"]

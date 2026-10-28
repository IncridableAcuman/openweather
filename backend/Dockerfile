# Stage 1: Build Spring Boot application with Java 21
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Gradle wrapper va sozlash fayllarini ko'chirish
COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle

# gradlew ga ijro huquqini berish
RUN chmod +x ./gradlew

# Kutubxonalarni keshlab yuklab olish
RUN ./gradlew dependencies --no-daemon || true

# Manba kodini ko'chirish va jar fayl qurish
COPY src ./src
RUN ./gradlew bootJar --no-daemon -x test

# Stage 2: Kichik hajmli JRE muhiti (Production)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Xavfsizlik uchun tizim foydalanuvchisi yaratish
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Tayyor jar faylni ko'chirish
COPY --from=builder /app/build/libs/*.jar app.jar

# Render avtomatik PORT muhit o'zgaruvchisini uzatadi
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

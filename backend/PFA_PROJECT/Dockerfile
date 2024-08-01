#### Stage 1: Build the application
FROM openjdk:17-oracle as build

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and project descriptor
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Fix line endings for the Maven wrapper script
RUN sed -i 's/\r$//' mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code and build the application
COPY src src
RUN ./mvnw package -DskipTests

### Stage 2: Create a minimal Docker image with the application
FROM openjdk:17-oracle

# Set the working directory
WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Entry point to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

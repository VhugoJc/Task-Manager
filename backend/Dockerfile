# Use a base image with Java 21 (or your preferred version)
FROM eclipse-temurin:21 

# Set the working directory inside the container
WORKDIR /app

# Copy the target directory (where Maven builds the JAR) into the container
COPY ./target/taskmanager-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"] 
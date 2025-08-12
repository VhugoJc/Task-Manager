# React and Spring Boot CRUD Task Application

This is a CRUD (Create, Read, Update, Delete) application built using React for the frontend and Spring Boot for the backend.

## Features

- **Create:** Add new items to the database .
- **Read:** View a list of all items, or details of a specific item.
- **Update:** Modify existing items.
- **Delete:** Remove items from the database.

## Technologies Used

- **Frontend:** React
- **Backend:** Spring Boot
- **Database:** MongoDB
- **Build Tools:** Maven
- **Containerization:** Docker

## Getting Started
### Prerequisites

* **Docker:** Make sure you have Docker installed and running on your system. [https://www.docker.com/get-started](https://www.docker.com/get-started)
* **Docker Compose:** You'll need Docker Compose to run the multi-container application. [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VhugoJc/Task-Manager.git
   cd Task-Manager
   ```
2. **Build the project:**
    ```bash
    ./build_and_run.sh
    ```
    This command will:
    - Build the Docker images for the frontend, backend, and database.
    - Start the containers in the background (detached mode).
3. **Access the application:**
- Frontend: http://localhost:3000
### Stopping the application:
  ```bash
    docker-compose down
  ```


## API Documentation

**[Option 1: Link to External Documentation]**

- If you are using a tool like Swagger or Spring REST Docs to generate API documentation, provide a link here:
- [Link to your API documentation]

**[Option 2: Brief Overview]**

- If you don't have external documentation, provide a concise overview of your API endpoints here. For example:
```
Base URL: http://localhost:8080/api

Endpoints:

GET /items: Get all items.
GET /items/{id}: Get an item by ID.
POST /items: Create a new item.
PUT /items/{id}: Update an item.
DELETE /items/{id}: Delete an item.
```

## Project Structure

- **Backend (`[your-backend-directory-name]`):** Contains the Spring Boot application code.
- **`src/main/java/[your-package-structure]`:** Java source code.
- **`src/main/resources`:** Application properties, static resources.
- **Frontend (`[your-frontend-directory-name]`):** Contains the React application code.
- **`src/components`:** React components.
- **`src/services`:** API interaction logic.
- **`public`:** Static assets (index.html, etc.).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

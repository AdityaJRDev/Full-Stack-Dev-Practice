# Todo App Backend API

A simple RESTful API built with Node.js, Express, and MongoDB that allows users to register, log in, and manage a personal list of Todos.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

##  Project Structure

- **index.js**: Entry point of the application. Handles server setup, API routes, and authentication middleware.
- **db.js**: Defines the MongoDB schemas and models for `Users` and `Todos`.

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
````

2.  **Install dependencies**

    ```bash
    npm install express mongoose jsonwebtoken
    ```

3.  **Configure Database**
    Open `index.js` and ensure your MongoDB connection string is correct:

    ```javascript
    mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-app");
    ```

4.  **Run the Server**

    ```bash
    node index.js
    ```

    The server will start on port `3000`.

## Authentication

This API uses **JSON Web Tokens (JWT)** for securing routes.

  - **Secret Key:** Currently hardcoded as `ihatereligion` (should be moved to environment variables in production).
  - **Header:** Protected routes require a header key named `token` containing the JWT received upon login.

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/signup` | Create a new user account | `{ "username": "...", "password": "...", "name": "..." }` |
| **POST** | `/signin` | Log in and receive a JWT | `{ "username": "...", "password": "..." }` |

### Todo Routes (Protected)

*Note: These routes require the `token` header.*

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/todo` | Create a new todo item | `{ "title": "Buy milk", "done": false }` |
| **GET** | `/todos` | Fetch all todos for the logged-in user | *None* |

## 🗄️ Database Models

### User Model

  - **username**: String
  - **password**: String
  - **name**: String

### Todo Model

  - **title**: String
  - **done**: Boolean
  - **userId**: ObjectId (Links to the User model)

## Testing with Postman

1.  **Signup:** Send a POST request to `http://localhost:3000/signup`.
2.  **Signin:** Send a POST request to `http://localhost:3000/signin`. Copy the `token` from the response.
3.  **Add Todo:** - URL: `http://localhost:3000/todo`
      - Headers: Key: `token`, Value: `<paste-your-token-here>`
      - Body (JSON): `{ "title": "Learn Express", "done": false }`

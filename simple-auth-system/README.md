# Node.js Express & JWT Authentication

A full-stack authentication system built with **Node.js**, **Express**, and **Vanilla JavaScript**. This project demonstrates how to handle user Signup, Signin, and Protected Routes using **JSON Web Tokens (JWT)**.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Authentication:** JSON Web Tokens (JWT)
* **Frontend:** HTML5, Vanilla JavaScript
* **HTTP Client:** Axios

## Features

* **User Signup:** Registers a new user with a username and password.
* **User Signin:** Authenticates the user and issues a JWT token.
* **Token Handling:** Stores JWT in the browser's `localStorage`.
* **Protected Route:** Access restricted user information (`/me` endpoint) using the token.
* **Logout:** clear user session from the client side.

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    cd YOUR_REPO_NAME
    ```

2.  **Install Dependencies**
    ```bash
    npm install express jsonwebtoken cors
    ```
    *(Note: Ensure you have initialized npm with `npm init -y` first if you haven't already)*

3.  **Run the Server**
    ```bash
    node index.js
    ```
    *The server will start on port 3000.*

4.  **Access the Application**
    Open your browser and navigate to:
    `http://localhost:3000/`

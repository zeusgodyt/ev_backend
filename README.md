<p align="center">
  <img src="public/charger.png" alt="EV Charger Logo" width="250" />
</p>

# EV Charging Station Management - Backend

This directory contains the Node.js and Express backend for the EV Charging Station Management System. It provides a RESTful API for user authentication and CRUD operations on charging station data.

## Tech Stack

-   **Node.js**: JavaScript runtime environment
-   **Express**: Web application framework for Node.js
-   **MongoDB**: NoSQL database
-   **Mongoose**: MongoDB object data modeling (ODM) for Node.js
-   **JWT (JSON Web Tokens)**: For user authentication
-   **Bcryptjs**: For password hashing
-   **CORS**: Middleware for enabling Cross-Origin Resource Sharing
-   **Dotenv**: For loading environment variables from a `.env` file
-   **Nodemon**: For automatic server restarts during development


## Project Structure
backend/
├── src/
│   ├── controllers/  # Contains logic for handling API requests (e.g., authController.js, stationController.js)
│   ├── middleware/   # Contains middleware functions (e.g., auth.js for JWT protection)
│   ├── models/       # Defines Mongoose schemas and models (e.g., User.js, ChargingStation.js)
│   ├── routes/       # Defines API routes and links them to controllers (e.g., auth.js, stations.js)
│   └── server.js     # Main Express application setup, database connection, and route integration
├── package.json      # Project dependencies and scripts
├── .env.example      # Example environment variables file
└── README.md         # This file



## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   MongoDB instance (local or cloud-hosted like MongoDB Atlas)

### Installation

1.  Navigate into the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the backend dependencies:
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Copy the contents from `.env.example` into your new `.env` file.
3.  Update the placeholder values:
    -   `PORT`: The port your server will run on (e.g., `5000`).
    -   `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/ev-stations` or your Atlas URI).
    -   `JWT_SECRET`: A strong, random string for JWT signing (e.g., `supersecretjwtkey`).

    Example `.env` file:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/ev-stations
    JWT_SECRET=your_very_strong_and_secret_jwt_key_here
    ```

### Running the Server

To start the backend server in development mode (with Nodemon for auto-restarts):

```bash
npm run dev


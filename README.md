# Habit Tracker API

A RESTful API for tracking personal habits with user authentication and data persistence.

## Features

- User registration and authentication with JWT
- Create, read, update, and delete habits
- User-specific habit management
- Validation for all inputs
- API documentation with Swagger
- Centralized logging with Winston

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **API Documentation**: Swagger UI
- **Containerization**: Docker and Docker Compose
- **Logging**: Winston
- **Testing**: Jest, Supertest

## Project Structure

```
.
├── .env                  # Environment variables
├── docker-compose.yml    # Docker configuration
├── package.json          # Project dependencies
├── README.md             # Project documentation
├── server.js             # Main application entry point
├── swagger.json          # API documentation
├── config/
│   └── db.js             # Database connection
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   └── habitController.js
│   ├── middleware/       # Middleware functions
│   │   ├── auth.js       # JWT authentication
│   │   └── errorHandler.js
│   ├── models/           # Database models
│   │   ├── Habit.js
│   │   └── User.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   └── habitRoutes.js
│   └── utils/
│       └── logger.js     # Winston logger configuration
├── tests/                # Automated tests (Jest & Supertest)
│   ├── auth.test.js
│   └── habits.test.js
```

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose (for containerized MongoDB)

### Installation Steps

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file (see Environment Variables section)
4. Start MongoDB using Docker:
   ```bash
   docker-compose up -d
   ```
5. Start the application:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://admin:secret@localhost:27017/habit_db?authSource=admin
JWT_SECRET=habits_secret
```

## Logging

This project uses [Winston](https://github.com/winstonjs/winston) for centralized and leveled logging.  
Logs are output to the console and saved in the `logs/` directory as `error.log` and `combined.log`.

You can use the logger in your code as follows:

```js
const logger = require("./src/utils/logger");
logger.info("Informational message");
logger.error("Error message");
```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and receive JWT token

### Habits

- **GET /api/habits** - Get all habits for the authenticated user
- **POST /api/habits** - Create a new habit
- **PUT /api/habits/:id** - Update an existing habit
- **DELETE /api/habits/:id** - Delete a habit

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. First login with valid credentials to get a token
2. Include the token in subsequent requests in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Documentation

The API is documented using Swagger UI. After starting the application, access the documentation at:

```
http://localhost:3000/api/docs
```

## Docker Setup

A `docker-compose.yml` file is included to easily set up a MongoDB instance:

```bash
# Start MongoDB container
docker-compose up -d

# Stop MongoDB container
docker-compose down
```

## Testing the API

Automated tests are implemented using [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for endpoints and integration testing.

### Run all tests

```bash
npm test
```

- All test files are located in the `tests/` directory.
- You can add new test files following the pattern `*.test.js`.

You can also use Postman, curl, or any API client to test the endpoints manually. The Swagger documentation provides interactive testing capabilities as well.

# Expense Tracker API

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

A secure RESTful Expense Tracker API built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

This project enables users to register, authenticate, and securely manage their income and expenses through a REST API. It demonstrates backend development concepts including authentication, database integration, middleware, and CRUD operations.

---

## Features

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Support
- Password Hashing using bcrypt
- Income Management
- Expense Management
- MongoDB Database
- RESTful API Architecture
- Express Middleware
- Environment Variable Support

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

---

## Project Structure

```
Expense_tracker/
│
├── controllers/
│   ├── authController.js
│   ├── expenseController.js
│   └── incomeController.js
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utility/
│
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/RhemaGreat/Expense_tracker.git
```

Move into the project directory

```bash
cd Expense_tracker
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

Start the server

```bash
npm start
```

or

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | Login |
| POST | /logout | Logout |

---

### Income

| Method | Endpoint |
|---------|----------|
| GET | /income |
| POST | /income |
| PUT | /income/:id |
| DELETE | /income/:id |

---

### Expenses

| Method | Endpoint |
|---------|----------|
| GET | /expense |
| POST | /expense |
| PUT | /expense/:id |
| DELETE | /expense/:id |

---

## Authentication

After logging in, include the access token in the Authorization header.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Learning Objectives

This project demonstrates:

- REST API Design
- MVC Architecture
- User Authentication
- JWT Security
- Password Hashing
- MongoDB Integration
- Express Middleware
- CRUD Operations
- Backend Development Best Practices

---

## Future Improvements

- Email Verification
- Password Reset
- Budget Management
- Expense Categories
- Monthly Reports
- Charts and Analytics
- Swagger Documentation
- Docker Support
- Unit Tests
- CI/CD Pipeline

---

## Security Features

- Password hashing with bcrypt
- JWT Authentication
- Environment variable configuration
- MongoDB data persistence

---

## Ethical Use

This software is intended for educational purposes, portfolio development, and legitimate financial management applications.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature/new-feature
```

3. Commit your changes

```
git commit -m "Add new feature"
```

4. Push to GitHub

```
git push origin feature/new-feature
```

5. Open a Pull Request

---

## Roadmap

- [ ] Input Validation
- [ ] Unit Tests
- [ ] Swagger API Documentation
- [ ] Docker Support
- [ ] Role-Based Authorization
- [ ] Password Reset
- [ ] Email Verification
- [ ] GitHub Actions

---

## Author

**Rhema Great**

GitHub:
https://github.com/RhemaGreat

---

## License

This project is licensed under the MIT License.

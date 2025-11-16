# Login Page Monorepo

A full-stack authentication system with signup, login, and password reset functionality built with Node.js, React, TypeScript, and PostgreSQL.

## Project Structure

```
login_page/
├── backend/          # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── database/    # Database schema and migrations
│   │   ├── middleware/  # Authentication middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── utils/       # Utility functions (JWT, email)
│   └── package.json
├── frontend/        # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context (Auth)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── App.tsx
│   └── package.json
└── package.json     # Root package.json for monorepo
```

## Features

- ✅ User Signup
- ✅ User Login
- ✅ Forgot Password
- ✅ Reset Password
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Password Hashing (bcrypt)
- ✅ Email Notifications (for password reset)
- ✅ Modern UI with React
- ✅ TypeScript for type safety
- ✅ PostgreSQL database

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE login_db;

# Exit psql
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials and email settings
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=login_db
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your-secret-key
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Run database migrations
npm run build
npm run migrate

# Start development server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file (optional, defaults to localhost:5000)
cp .env.example .env

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Running Both (Monorepo)

From the root directory:

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/forgot-password` - Request password reset
  ```json
  {
    "email": "user@example.com"
  }
  ```

- `POST /api/auth/reset-password` - Reset password with token
  ```json
  {
    "token": "reset-token-from-email",
    "newPassword": "newpassword123"
  }
  ```

- `GET /api/auth/profile` - Get user profile (requires authentication)
  ```
  Headers: Authorization: Bearer <token>
  ```

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=login_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourapp.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `is_verified` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Password Reset Tokens Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `token` (VARCHAR, Unique)
- `expires_at` (TIMESTAMP)
- `used` (BOOLEAN)
- `created_at` (TIMESTAMP)

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Password reset tokens expire after 1 hour
- Used tokens are invalidated
- CORS protection
- Input validation

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- nodemailer (email sending)

### Frontend
- React
- TypeScript
- React Router
- Axios
- CSS3

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # React development server with hot reload
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## License

MIT


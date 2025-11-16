#!/bin/bash

echo "🚀 Setting up Login Page Monorepo..."

# Create .env files from examples
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env from example..."
    cp backend/env.example.txt backend/.env
    echo "✅ Backend .env created. Please update it with your database credentials."
else
    echo "⚠️  backend/.env already exists, skipping..."
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env from example..."
    cp frontend/env.example.txt frontend/.env
    echo "✅ Frontend .env created."
else
    echo "⚠️  frontend/.env already exists, skipping..."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Update backend/.env with your email settings (for password reset)"
echo "3. Create PostgreSQL database: CREATE DATABASE login_db;"
echo "4. Run migrations: cd backend && npm run build && npm run migrate"
echo "5. Start development: npm run dev (from root) or run backend/frontend separately"
echo ""


@echo off
echo 🚗 Setting up Carpool MVP...
echo.

echo 📦 Installing root dependencies...
call npm install
if errorlevel 1 (
    echo ❌ npm not found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo 📦 Installing backend dependencies...
cd ../server
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..
echo.
echo ✅ All dependencies installed successfully!
echo.
echo 🚀 To start the application:
echo    Backend:  npm start
echo    Frontend: npm run dev
echo.
echo 📖 See README.md for detailed instructions
pause

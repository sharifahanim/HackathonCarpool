@echo off
echo 🚗 Starting Carpool MVP Development Servers...
echo.

echo 🔧 Starting Backend Server (Port 5000)...
start "Carpool Backend" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend Server (Port 3000)...
start "Carpool Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting...
echo 📱 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:5000
echo.
echo Press any key to close this window...
pause >nul

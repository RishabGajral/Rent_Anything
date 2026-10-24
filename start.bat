@echo off
cd /d "%~dp0"
set NODE_OPTIONS=--use-system-ca
echo ========================================================
echo  Starting Rent Anything Bengaluru (Next.js Dev Server)
echo ========================================================
echo  URL: http://localhost:3000
echo ========================================================
start http://localhost:3000
npm run dev
pause

@echo off

REM Display current status
git status
pause

REM Prompt user for commit message
set /p commit_message="Enter your commit message: "

REM Add all modified files
git add .

REM Commit changes with the provided message
git commit -m "%commit_message%"

REM Push changes to GitHub
git push origin main

pause

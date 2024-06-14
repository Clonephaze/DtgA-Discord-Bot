@echo off

echo Checking for updates...

:: Fetch the latest changes from the remote repository
git fetch

:: Check if there are any updates
for /f %%i in ('git rev-list HEAD...origin/main --count') do set BEHIND=%%i

if %BEHIND% GTR 0 (
    echo Pulling latest updates...
    git pull
) else (
    echo No updates found.
)

echo Logging in...

:: Launch the Node.js application
node index.js

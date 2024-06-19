@echo off

echo Checking for updates...

:: Fetch the latest changes from the remote repository
git fetch

:: Check if there are any updates
for /f %%i in ('git rev-list HEAD...origin/main --count') do set BEHIND=%%i

:: If there are updates, pull them
if %BEHIND% GTR 0 (
    echo Pulling latest updates...
    git pull
:: If there are no updates, echo it and move on
) else (
    echo No updates found.
)

:: Log the bot in
echo Logging in...

:: Launch the Node.js application
node index.js

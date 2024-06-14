@echo off

title "Installing Dependencies"

REM This script sets up a development environment by installing several dependencies and cloning the GitHub repository for the bot

REM This creates a file in your documents folder that stores the directory location that you would like to clone the git into
REM This was necessary as I need to refresh the PATH later on which erases any normal attempt to tell the script where to clone.
echo %~dp0 > %userprofile%\Documents\CTBSCL.txt

REM Check if Node.js is installed, and if not, download and install it.
node -v > nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    echo Node.js is being installed, please wait...
    curl -o node.msi https://nodejs.org/dist/v20.3.1/node-v20.3.1-x64.msi

    REM Run the installer and wait for it to complete
    start /wait msiexec /i node.msi /quiet /norestart
    if %errorlevel% neq 0 (
        echo An error occurred while installing Node.js.
        exit
    )
    del node.msi
)

REM Retrieve the original location of the script.
set /p original_location=<%userprofile%\Documents\CTBSCL.txt

REM Check if Python 3.8 is installed, and if not, download and install it.
echo Checking for Python 3.8 installation...

:: Attempt to retrieve Python version
echo Attempting to retrieve Python version...
python --version 2>NUL
if errorlevel 1 goto errorNoPython

:: If Python is found, check for version 3.8
echo Python is installed. Checking for version 3.8...
for /f "tokens=2 delims= " %%a in ('python --version') do set "pyVersion=%%a"
echo Python version: %pyVersion%
if "%pyVersion:~0,3%" neq "3.8" (
    echo Python is installed but version is not 3.8. Installing Python 3.8...
    goto installPython
) else (
    echo Python 3.8 is already installed.
    goto pythonCheckComplete
)

:: Label for handling Python not found
:errorNoPython
echo Python is not installed. Installing Python 3.8...
goto installPython

:: Label for installing Python 3.8
:installPython
echo Downloading Python 3.8 installer...
curl -s -o python-3.8.10-amd64.exe https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe
if errorlevel 1 (
    echo Failed to download Python 3.8 installer.
    pause
    exit /b %errorlevel%
)

echo Installing Python 3.8...
start /wait python-3.8.10-amd64.exe /quiet InstallAllUsers=1 PrependPath=1
if errorlevel 1 (
    echo Failed to install Python 3.8. Please use the downloaded installer to install Python 3.8 and re-run this script.
    pause
    exit /b %errorlevel%
) else (
    echo Python 3.8 has been successfully installed.
)

:: Cleanup
echo Cleaning up...
del python-3.8.10-amd64.exe

:pythonCheckComplete
echo Python installation check complete.

REM Checks if Chocolatey is installed, and if not, downloads and installs it.
if not exist "%ChocolateyInstall%" (
    echo Chocolatey is not installed. Proceeding with installation, please wait...
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    if %errorlevel% neq 0 (
        echo An error occurred while installing Chocolatey.
        pause
        exit
    )
) else (
    dir "%ChocolateyInstall%" /a-d /b >nul 2>nul
    if %errorlevel% equ 0 (
        echo Chocolatey is already installed.
    ) else (
        echo Chocolatey installation directory is empty. Proceeding with installation, please wait...
        @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
        if %errorlevel% neq 0 (
            echo An error occurred while installing Chocolatey.
            pause
            exit
        )
    )
)

REM Checks if Git is installed, and if not, downloads and installs it.
where git > nul 2>&1
if %errorlevel% equ 0 (
    echo Git is already installed.
) else (
    echo Git is being installed, please wait...
    choco install git -y
    if %errorlevel% neq 0 (
        echo An error occurred while installing Git.
        pause
        exit
    )
)

title "Cloning the GitHub repository"

REM Update the system PATH with the user's PATH.
for /f "tokens=3*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path') do set syspath=%%A%%B
for /f "tokens=3*" %%A in ('reg query "HKCU\Environment" /v Path') do set userpath=%%A%%B
set "PATH=%userpath%;%syspath%"

REM Change the current directory to the original location of the script.
set /p original_location=<%userprofile%\Documents\CTBSCL.txt
cd /d %original_location%

REM Clone a GitHub repository.
git clone -b ForWildModsServer https://github.com/Clonephaze/DtgA-Discord-Bot
if %errorlevel% neq 0 (
    echo An error occurred while cloning the repository.
    pause
    exit
)

REM Delete the file used to store the directory location.
if exist "%userprofile%\Documents\CTBSCL.txt" (
    del "%userprofile%\Documents\CTBSCL.txt"
)

REM Change the current directory to the cloned repository's Install Script directory.
cd "Clones-Test-Bot/Install Script"

REM Run a Python script.
python "DependenciesFileCreation.py"
if %errorlevel% neq 0 (
    echo An error occurred while running the Python script.
    pause
    exit
)

echo Script completed.
pause

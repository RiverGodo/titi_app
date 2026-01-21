cd d:

@echo off

set /p name=commit: 

echo %name%
git pull
git add .
git commit -m "%name%"
git push

cmd.exe
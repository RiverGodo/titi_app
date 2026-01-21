cd e:

@echo off

set /p name=commit: 

echo %name%

git add .
git commit -m "%name%"
git push

cmd.exe
@echo off
set PGDATA=C:\Users\Casper\AppData\Roaming\ss-karma-sanayi\pgdata
set PWFILE=C:\tmp\pgpass.txt

cd "C:\Users\Casper\Desktop\Dosyalar\Dosyalar\Karma Sanayi APP Dosyalar\ss-karma-sanayi\node_modules\@embedded-postgres\windows-x64\native\bin"

echo Initializing database...
initdb.exe -D "%PGDATA%" -A password -U karma_admin --pwfile "%PWFILE%" --locale=C --encoding=UTF8

echo Starting PostgreSQL...
pg_ctl.exe -D "%PGDATA%" -l "C:\Users\Casper\AppData\Roaming\ss-karma-sanayi\postgres.log" -w start
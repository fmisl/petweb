@ECHO OFF
SET killport=8021
SET root=C:\ProgramData\Anaconda3
call %root%\Scripts\activate.bat %root%


for /f "tokens=5" %%p in ('netstat -aon ^| find /i "listening" ^| find "%killport%"') do taskkill /F /PID %%p

call conda activate tf_cpu
call cd C:\Users\BRMH\workspace\petweb\petweb-back
call python manage.py makemigrations
call python manage.py migrate
call python manage.py runserver 0.0.0.0:8021

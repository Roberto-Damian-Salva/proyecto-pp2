@echo off
cd /d C:\Users\sheil\sistematurnos
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

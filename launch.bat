@echo off
cd venv\Scripts
echo run env
PowerShell.exe -ExecutionPolicy Bypass -File Activate.ps1
echo run online compiler
python E:\VSCodeProject\OPC\main.py
pause
deactivate
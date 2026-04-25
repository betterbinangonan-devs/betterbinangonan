@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"
title PNPM Refresh - Install - Lint - Typecheck - Build

:again
cls
echo ===========================================================
echo   PNPM Refresh Toolkit
echo   Folder: %cd%
echo ===========================================================
echo.

echo [1/4] Installing dependencies...
call pnpm install
if errorlevel 1 goto failed

echo.
echo [2/4] Fixing lint issues...
call pnpm lint:fix
if errorlevel 1 goto failed

echo.
echo [3/4] Running typecheck...
call pnpm typecheck
if errorlevel 1 goto failed

echo.
echo [4/4] Building project...
call pnpm build
if errorlevel 1 goto failed

echo.
echo ===========================================================
echo   Done!
echo ===========================================================
echo.
choice /M "Run the whole process again?" /C YN
if errorlevel 2 goto done
goto again

:failed
echo.
echo ===========================================================
echo   A step failed.
echo ===========================================================
echo.
choice /M "Run the whole process again?" /C YN
if errorlevel 2 goto done
goto again

:done
echo.
echo All done. Press any key to close...
pause >nul
endlocal
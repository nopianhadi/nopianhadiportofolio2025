@echo off
REM Script untuk menghapus file .env dari git history (Windows)
REM PERINGATAN: Ini akan mengubah git history!

echo.
echo ========================================
echo   PERINGATAN: Script ini akan mengubah git history!
echo   Pastikan Anda sudah backup repository sebelum melanjutkan.
echo ========================================
echo.
set /p confirm="Lanjutkan? (Y/N): "

if /i not "%confirm%"=="Y" (
    echo Dibatalkan.
    exit /b
)

echo.
echo Menghapus .env dari git history...
echo.

REM Remove .env from git cache
git rm --cached .env 2>nul || echo .env sudah tidak ada di cache

REM Remove from history using filter-branch
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

echo.
echo ========================================
echo   .env berhasil dihapus dari git history
echo ========================================
echo.
echo Langkah selanjutnya:
echo 1. Pastikan .env sudah ada di .gitignore
echo 2. Copy .env.example ke .env.local
echo 3. Edit .env.local dengan kredensial Anda
echo 4. Commit perubahan:
echo    git add .gitignore .env.example
echo    git commit -m "Remove .env from repository and add .env.example"
echo 5. Force push (HATI-HATI!):
echo    git push origin --force --all
echo.
echo PENTING: Setelah force push, semua collaborator harus:
echo    git fetch origin
echo    git reset --hard origin/main
echo.
echo Jangan lupa ganti kredensial Supabase jika .env sudah public!
echo.
pause

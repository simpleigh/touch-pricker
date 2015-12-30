@IF EXIST "%~dp0\..\node_modules\.bin\gulp.cmd" (
  "%~dp0\..\node_modules\.bin\gulp.cmd" %*
) ELSE (
  echo Please run 'npm install' first.
)

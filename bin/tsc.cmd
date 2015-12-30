@IF EXIST "%~dp0\..\node_modules\.bin\tsc.cmd" (
  "%~dp0\..\node_modules\.bin\tsc.cmd" %*
) ELSE (
  echo Please run 'npm install' first.
)

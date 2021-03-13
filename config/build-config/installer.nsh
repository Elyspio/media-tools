!macro customInstall
  DeleteRegKey HKCU "Software\Classes\directory\Background\shell\Elytools"
  WriteRegStr HKCU "Software\Classes\directory\Background\shell\Elytools" "" ""
  WriteRegStr HKCU "Software\Classes\directory\Background\shell\Elytools" "icon" "$INSTDIR\${APP_EXECUTABLE_FILENAME},0"
  WriteRegStr HKCU "Software\Classes\directory\Background\shell\Elytools\command" "" '$INSTDIR\${APP_EXECUTABLE_FILENAME} --folder "%V"'

!macroend

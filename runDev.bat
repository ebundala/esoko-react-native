react-native start
curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
cd android && gradlew.bat install Debug
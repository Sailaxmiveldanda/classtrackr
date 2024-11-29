# ClassTrackr 
## Prerequisites for running application:
   - Node
   - Android Studio
   - React Native for Android

**Installation Process:**
- **Node.js Installation:**
  - Go to the [Node.js website](https://nodejs.org).
  - Download the appropriate installer for your operating system (Windows, macOS, Linux).
  - Run the installer and follow the on-screen instructions to install Node.js.
  - Verify the installation by opening a terminal/command prompt and typing:
    - `node --version`
    - `npm –version`

- **React Native for Android:**
  - Open a terminal/command prompt.
  - Install React Native CLI globally by running:
    - `npm install -g react-native-cli`

- **Android Studio Installation:**
  - Download Android Studio from the [official website](https://developer.android.com/studio).
  - Run the installer and follow the on-screen instructions to install Android Studio.
  - During installation, ensure to install the Android SDK and other necessary components.
  - Once installed, open Android Studio and set up the Android SDK and AVD as needed for React Native development.

## Environment Set Up:
   - **Run project in development:**
     - Clone the repository and run the following commands to run the app in your local setup.
       - **Install dependencies:**
         - `npm install`
       - **Run on Android:**
         - `npm run android`
       - **To start metro server (if it doesn't start automatically):**
         - `npm start`

## How to compile APK?
   - **Steps to build debug APK:**
     - Note: Please don't push the files generated while compiling the js assets.
     - **Compile JS assets. (Run this on the root directory)**
       - `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
     - **Clean previous builds**
       - `cd android && ./gradlew clean`
     - **Build debug APK**
       - `./gradlew assembleRelease`

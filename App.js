import React from "react";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { ImageBackground, StyleSheet } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};
export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.error}
      />
    );
  }

  return (
    <ImageBackground style={styles.image} source={require("./image/Bg.jpg")}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

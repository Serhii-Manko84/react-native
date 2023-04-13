import React from "react";
import { useCallback, useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import {
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={KeyboardHide}>
        <ImageBackground
          style={styles.image}
          source={require("./image/Bg.jpg")}
          onLayout={onLayoutRootView}
        >
          <RegistrationScreen />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

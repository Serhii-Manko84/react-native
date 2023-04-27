import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { useRoute } from "./router";
import { store } from "./redux/store";
import { autentification } from "./firebase/config";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);

  autentification.onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require("./image/Bg.jpg")}
        onLayout={onLayoutRootView}
      >
        <Provider store={store}>
          <NavigationContainer>{routing}</NavigationContainer>
        </Provider>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

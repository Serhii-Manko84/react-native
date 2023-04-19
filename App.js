import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreens/Home";
import CommentsScreen from "./Screens/mainScreens/CommentsScreen";
import CreatePostsScreen from "./Screens/mainScreens/CommentsScreen";
import MapScreen from "./Screens/mainScreens/MapScreen";
import PostsScreen from "./Screens/mainScreens/PostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Register">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      {/* <MainTab.Screen name="Home" component={Home} /> */}
      <MainTab.Screen name="PostsScreen" component={PostsScreen} />
      <MainTab.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <MainTab.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <MainTab.Screen name="CommentsScreen" component={CommentsScreen} /> */}
      {/* <MainTab.Screen name="MapScreen" component={MapScreen} /> */}
    </MainTab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
  });

  const routing = useRoute(null);

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
        <NavigationContainer>{routing}</NavigationContainer>
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

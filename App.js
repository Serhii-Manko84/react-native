import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import CreatePostsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import PostsScreen from "./Screens/PostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function App() {
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
        <NavigationContainer>
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
          {/* <MainStack.Navigator>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen
              name="CommentsScreen"
              component={CommentsScreen}
            />
            <MainStack.Screen
              name="CreatePostsScreen"
              component={CreatePostsScreen}
            />
            <MainStack.Screen name="MapScreen" component={MapScreen} />
            <MainStack.Screen name="PostsScreen" component={PostsScreen} />
            <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
          </MainStack.Navigator> */}
        </NavigationContainer>
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

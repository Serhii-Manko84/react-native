import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import { authSignInOutUser } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignInOutUser());
  };
  return (
    <MainTab.Navigator screenOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="logout"
              color={"#BDBDBD"}
              size={30}
              marginRight={10}
              onPress={signOut}
            />
          ),
          headerTitleStyle: {
            fontWeight: "medium",
            fontSize: 20,
            marginLeft: 140,
          },
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={25} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;

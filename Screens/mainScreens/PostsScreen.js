import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />

      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />

      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

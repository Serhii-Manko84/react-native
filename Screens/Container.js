import React from "react";
import { StyleSheet } from "react-native";

const Container = ({ children }) => {
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: "25",
    borderTopRightRadius: "25",
  },
});

export default Container;

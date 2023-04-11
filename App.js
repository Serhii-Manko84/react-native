import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const KeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require("./image/Bg.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 100 }}
          >
            <View>
              <Text style={styles.inputTitle}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={KeyboardHide}
            >
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
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
    justifyContent: "flex-end",
    // alignItems: "center",
  },

  form: {
    marginHorizontal: 40,
  },

  inputTitle: {
    color: "#ffffff",
    marginBottom: 10,
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    height: 40,
    borderRadius: 6,
    color: "#ffffff",
  },

  btn: {
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        barderColor: "transparent",
      },
      android: {
        backgroundColor: "#ffffff",
        barderColor: "#ffffff",
      },
    }),
  },

  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#00cca3",
    fontSize: 16,
  },
});

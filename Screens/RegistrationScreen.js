import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
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
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const loadFont = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const KeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    setState(initialState);
  };

  if (!isReady) {
    return (
      <Apploading
        startAsync={loadFont}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../image/Bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 280,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>E-MAIL</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 50,
  },

  headerTitle: {
    color: "#ffffff",
    marginBottom: 10,
    fontSize: 18,
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
    fontFamily: "RobotoSlab-Medium",
  },
});

export default RegistrationScreen;

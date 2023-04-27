import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const KeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const passwordToggle = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 10 : 50,
              width: dimensions,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Увійти</Text>
            </View>

            <View style={styles.viewInput}>
              <TextInput
                placeholder="Адреса електроної пошти"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                textAlign={"left"}
                secureTextEntry={isSecureTextEntry}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.btnPass}>
                <Text style={styles.textPass} onPress={passwordToggle}>
                  Показати
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              {/* () => navigation.navigate("Home") */}

              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.btnLog,
                marginBottom: isShowKeyboard ? 30 : 75,
              }}
            >
              <Text
                style={{
                  ...styles.textLog,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                Немає акаунта? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: "55%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  header: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },

  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },

  viewInput: {
    textAlign: "left",
  },

  input: {
    borderWidth: 1,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  btnPass: {
    position: "absolute",
    right: 32,
    ...Platform.select({
      ios: {
        top: 16,
      },
      android: {
        top: 15,
      },
    }),
  },

  textPass: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },

  btn: {
    height: 51,
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 27,
    backgroundColor: "#FF6C00",
  },

  btnTitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    marginBottom: 16,
    color: "#fff",
  },

  btnLog: {
    alignItems: "center",
    marginTop: 16,
  },
  textLog: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;

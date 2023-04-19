import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
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

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
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

  const KeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
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
              marginBottom: isShowKeyboard ? 20 : 150,
              width: dimensions,
            }}
          >
            <View style={styles.avatarImg}>
              {/* <Image
                  source={require("../assets/images/avatar.jpeg")}
              /> */}
              <Pressable style={styles.addAvatar}>
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </Pressable>
            </View>

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Реєстрація</Text>
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder="Логін"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
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
              onPress={KeyboardHide}
            >
              <Text style={styles.btnTitle}>Зареєструватися</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.btnLog,
                marginBottom: isShowKeyboard ? 30 : 75,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{
                  ...styles.textLog,
                  display: isShowKeyboard ? "none" : "flex",
                }}
              >
                Вже є аккаунт? Увійти
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
    marginTop: "25%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatarImg: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    marginTop: -60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  addAvatar: {
    width: 25,
    height: 25,
    marginRight: -12.5,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 100,
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

export default RegistrationScreen;

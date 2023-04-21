import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const initialState = {
  name: "",
  region: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
  };

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo, state });
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        )}

        <TouchableOpacity onPress={takePhoto}>
          <View>
            <MaterialCommunityIcons name="camera" color={"#BDBDBD"} size={35} />
          </View>
        </TouchableOpacity>
      </Camera>
      <View style={styles.photoBox}>
        <Text style={styles.photoText}>Завантажте фото</Text>

        <TextInput
          placeholder="Назва..."
          style={styles.nameText}
          value={state.name}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, name: value }))
          }
        />

        <TextInput
          style={styles.regionText}
          placeholder="Місцезнаходження..."
          value={state.region}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, region: value }))
          }
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendPhoto}
          onPress={sendPhoto}
        >
          <Text style={styles.sendLabel}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },

  camera: {
    height: "40%",
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  takePhotoContainer: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#fff",
    top: 10,
    right: 10,
  },

  photoBox: {
    marginTop: 10,
    marginLeft: 15,
  },

  photoText: {
    fontSize: 16,
    color: "#BDBDBD",
  },

  nameText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 10,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    borderColor: "#E8E8E8",
    height: 40,
  },
  regionText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 20,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    borderColor: "#E8E8E8",
    height: 40,
  },

  sendPhoto: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 16,
    height: 45,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  sendLabel: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
});

export default CreatePostsScreen;

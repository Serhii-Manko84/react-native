import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              sourse={{ uri: photo }}
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
    height: "45%",
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 10,
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
    marginLeft: 16,
  },

  photoText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;

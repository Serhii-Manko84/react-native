import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  region: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);

  const { userID, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    // console.log("photo.uri", photo.uri);
    // console.log("location", location);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setState(initialState);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      state,
      location: location.coords,
      userID,
      login,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `images/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
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

import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    await onSnapshot(collection(db, "posts"), (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerPhoto}>
            <Image source={{ uri: item.photo }} style={styles.postImage} />
            {/* <View style={styles.containerComment}>
              <Text style={styles.titleComment}>{item.comment}</Text>
            </View> */}
            <View style={styles.btnNavigation}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendNavigate}
                onPress={() =>
                  navigation.navigate("MapScreen", { location: item.location })
                }
              >
                <Text style={styles.sendText}>Go to Map</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendNavigate}
                onPress={() =>
                  navigation.navigate("CommentsScreen", { postId: item.id })
                }
              >
                <Text style={styles.sendText}>Go to Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  containerPhoto: {
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  postImage: {
    marginHorizontal: 16,
    width: "100%",
    height: 200,
  },

  btnNavigation: {
    marginHorizontal: 16,
  },
  sendNavigate: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 16,
    height: 45,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  sendText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#fff",
    marginHorizontal: 10,
  },
});

export default DefaultScreenPosts;

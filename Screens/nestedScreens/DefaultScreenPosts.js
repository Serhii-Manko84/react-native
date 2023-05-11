import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    await onSnapshot(collection(db, "posts"), (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerPhoto}>
            <Image source={{ uri: item.photo }} style={styles.postImage} />
          </View>
        )}
      />
      <Button title="go to Map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
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
  btnNabigation: {
    marginHorizontal: 16,
  },
});

export default DefaultScreenPosts;

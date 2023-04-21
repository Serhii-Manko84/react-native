import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

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
});

export default PostsScreen;

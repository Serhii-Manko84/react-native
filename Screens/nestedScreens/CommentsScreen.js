import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { db } from "../../firebase/config";
import { doc, addDoc, collection, onSnapshot } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const postId = route.params.postId;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const docPostRef = await doc(db, "posts", postId);
    await addDoc(collection(docPostRef, "comments"), {
      comment,
      login,
    });
    setComment("");
  };

  const getAllComments = async () => {
    const docPostRef = await doc(db, "posts", postId);
    onSnapshot(collection(docPostRef, "comments"), (data) =>
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.containerComments}>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <TextInput
        style={styles.nameText}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.sendComment}
        onPress={createComment}
      >
        <Text style={styles.sendLabel}>Add Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },

  containerComments: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },

  nameText: {
    fontFamily: "Roboto-BoldItalic",
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 10,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    borderColor: "#E8E8E8",
    height: 40,
  },

  sendComment: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 16,
    height: 45,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 20,
  },

  sendLabel: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
});

export default CommentsScreen;

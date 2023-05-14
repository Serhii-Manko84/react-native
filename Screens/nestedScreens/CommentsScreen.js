import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import { doc, addDoc, collection } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const postId = route.params.postId;
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);

  const createComment = async () => {
    const docPostRef = await doc(db, "posts", postId);
    await addDoc(collection(docPostRef, "comments"), {
      comment,
      login,
    });
  };

  return (
    <View style={styles.container}>
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
    justifyContent: "flex-end",
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

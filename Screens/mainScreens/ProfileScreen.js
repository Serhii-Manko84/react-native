import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSignInOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userID } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = collection(db, "posts");
    const commentsQuery = query(postsRef, where("userID", "==", userID));
    onSnapshot(commentsQuery, (data) =>
      setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
    );
  };

  const signOut = () => {
    dispatch(authSignInOutUser());
  };
  return (
    <View style={styles.container}>
      <View style={styles.btnNavigation}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendNavigate}
          onPress={() => navigation.navigate("DefaultScreen")}
        >
          <Text style={styles.sendText}>Go to PostScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendNavigate}
          onPress={() => signOut()}
        >
          <Text style={styles.sendText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={userPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerPhoto}>
              <Image source={{ uri: item.photo }} style={styles.postImage} />
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btnNavigation: {
    display: "flex",
    marginTop: 40,
    marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
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

export default ProfileScreen;

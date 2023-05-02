import React, { useEffect, useState } from "react";
import { useRoute } from "../router";
import { NavigationContainer } from "@react-navigation/native";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { autentification } from "../firebase/config";

const Main = () => {
  const [user, setUser] = useState(null);

  const state = useSelector((state) => state);
  console.log(state);

  autentification.onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  useEffect(() => {}, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

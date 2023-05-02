import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { autentification } from "../../firebase/config";

import { authSlice } from "./authReducer";

export const authCreateUser = ({ login, email, password }) => {
  return async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(
        autentification,
        email,
        password
      );

      await updateProfile(autentification.currentUser, {
        displayName: login,
      });

      const { displayName, uid } = await autentification.currentUser;

      const userUpdateProfile = { login: displayName, userID: uid };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
};

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        autentification,
        email,
        password
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInOutUser = () => async (dispatch, getState) => {};
export const authStateChangeUser = () => async (dispatch, getState) => {
  await autentification.onAuthStateChanged((user) => setUser(user));
};

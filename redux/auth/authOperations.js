import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { autentification } from "../../firebase/config";

export const authCreateUser = ({ login, email, password }) => {
  return async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(
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

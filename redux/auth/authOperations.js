import { createUserWithEmailAndPassword } from "firebase/auth";
import { autentification } from "../../firebase/config";

export const authSignInUser = ({ login, email, password }) => {
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

export const authSignUpUser = () => async (dispatch, getState) => {};

export const authSignInOutUser = () => async (dispatch, getState) => {};

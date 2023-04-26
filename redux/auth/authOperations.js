import { db, auth } from "../../firebase/config";

export const authSignInUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      console.log("login, email, password ", login, email, password);
      const user = await db.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser = () => async (dispatch, getState) => {};

export const authSignInOutUser = () => async (dispatch, getState) => {};

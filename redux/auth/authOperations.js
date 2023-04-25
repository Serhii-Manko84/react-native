import db from "../../firebase/config";

export const authSignInUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword((email, password));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser = () => async (dispatch, getState) => {
  try {
  } catch (error) {}
};

export const authSignInOutUser = () => async (dispatch, getState) => {
  try {
  } catch (error) {}
};

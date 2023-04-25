import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userID: null,
    login: null,
  },
  reducers: {},
});

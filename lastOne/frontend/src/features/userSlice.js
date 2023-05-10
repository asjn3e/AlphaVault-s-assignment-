import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
    token: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setToken, setError } = userSlice.actions;
export const { reducer } = userSlice;

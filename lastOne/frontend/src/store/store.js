import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

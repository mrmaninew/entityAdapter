import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSplice";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export default store;

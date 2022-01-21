import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSplice";
import myDynamicFormReducer from "./MyDynamicFormSlice";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    myDynamicForm: myDynamicFormReducer,
  },
});

export default store;

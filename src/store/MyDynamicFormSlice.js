import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const myDynamicFormsAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const myDynamicFormSlice = createSlice({
  name: "myDynamicForm",
  initialState: {},
  reducers: {
    createState(state, { payload: id }) {
      state[id] = myDynamicFormsAdapter.getInitialState({ loading: true });
    },
    setAll(state, { payload: { id, array } }) {
      myDynamicFormsAdapter.setAll(state[id], array);
    },
  },
});

export const { createState, setAll } = myDynamicFormSlice.actions;

export default myDynamicFormSlice.reducer;

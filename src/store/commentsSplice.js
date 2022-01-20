import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import api from "../api/index";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    return await api.get("/comments?_limit=10").then((result) => {
      return result.data;
    });
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id) => {
    await api.delete(`/comments/${id}`, { data: { id: id } });
    return id;
  }
);

export const patchComment = createAsyncThunk(
  "comments/patchComment",
  async ({ id, newObj }) => {
    const changes = await api
      .patch(`/comments/${id}`, newObj)
      .then((result) => {
        return result.data;
      });
    return { id, changes };
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {
    updateOneComment: commentsAdapter.updateOne,
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload);
    },
    [fetchComments.rejected](state) {
      state.loading = false;
    },
    [deleteComment.pending](state) {
      state.loading = true;
    },
    [deleteComment.rejected](state) {
      state.loading = false;
    },
    [deleteComment.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.removeOne(state, payload);
    },
    [patchComment.pending](state) {
      state.loading = true;
    },
    [patchComment.rejected](state) {
      state.loading = false;
    },
    [patchComment.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    },
  },
});

export const commentsSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

export const { updateOneComment } = commentsSlice.actions;
export default commentsSlice.reducer;

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
      const tags = result.data
        .reduce((prev, curr) => [...prev, curr.tags], [])
        .flat();
      const likes = result.data
        .reduce((prev, curr) => [...prev, curr.likes], [])
        .flat();
      const comments = result.data.map(({ id, body }) => ({ id, body }));
      return { comments, tags, likes };
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

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.id,
});

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.id,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({
    loading: false,
    likes: likesAdapter.getInitialState(),
    tags: tagsAdapter.getInitialState(),
  }),
  reducers: {
    updateOneComment: commentsAdapter.updateOne,
    removeLikes(state) {
      likesAdapter.removeAll(state.likes, {});
    },
    removeTagById(state, { payload: tagId }) {
      tagsAdapter.removeOne(state.tags, tagId);
    },
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload.comments);
      tagsAdapter.setAll(state.tags, payload.tags);
      likesAdapter.setAll(state.likes, payload.likes);
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

export const likesSelectors = likesAdapter.getSelectors(
  (state) => state.comments.likes
);

export const tagsSelectors = tagsAdapter.getSelectors(
  (state) => state.comments.tags
);

export const { updateOneComment, removeLikes, removeTagById } =
  commentsSlice.actions;
export default commentsSlice.reducer;

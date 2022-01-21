import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import {
  fetchComments,
  patchComment,
  commentsSelectors,
  likesSelectors,
  deleteComment,
  updateOneComment,
  removeLikes,
  removeTagById,
} from "../store/commentsSplice";
import classes from "./Comments.module.css";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(commentsSelectors.selectAll);
  const allLikes = useSelector(likesSelectors.selectAll);

  console.log(allLikes);

  const onDelete = useCallback(
    (id) => {
      dispatch(deleteComment(id)).then((data) => console.log(data));
    },
    [dispatch]
  );

  const onPatch = useCallback(
    (id, newObj) => dispatch(patchComment({ id, newObj })),
    [dispatch]
  );
  const onUpdateOne = useCallback(
    (id, newObj) => dispatch(updateOneComment({ id, changes: newObj })),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className={classes.comments}>
      <h1>Comments</h1>
      <br />
      <div>
        <button onClick={() => dispatch(removeLikes())} style={{ left: 20 }}>
          Remove Likes
        </button>
        <button
          onClick={() =>
            dispatch(removeTagById("cc5098cd-7bcf-4069-ac80-bf25d5bc8720"))
          }
          style={{ left: 20 }}
        >
          Remove Tag By Id
        </button>
      </div>

      <ul>
        {allComments.length > 0 &&
          allComments.map(({ id, body }) => (
            <Comment
              key={id}
              id={id}
              body={body}
              onDelete={onDelete}
              onPatch={onPatch}
              onUpdateOne={onUpdateOne}
            />
          ))}
      </ul>
    </div>
  );
};

export default Comments;

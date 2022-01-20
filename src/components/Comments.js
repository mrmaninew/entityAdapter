import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import {
  fetchComments,
  patchComment,
  commentsSelectors,
  deleteComment,
  updateOneComment,
} from "../store/commentsSplice";
import classes from "./Comments.module.css";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(commentsSelectors.selectAll);

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

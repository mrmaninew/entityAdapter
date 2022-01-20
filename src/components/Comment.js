import React, { memo } from "react";
import PropTypes from "prop-types";

const Comment = ({ id, body, onDelete, onPatch, onUpdateOne }) => {
  return (
    <li
      style={{ padding: "5px", marginBottom: "5px", border: "black 1px solid" }}
    >
      <h3>{id}</h3>
      {body}
      <br />
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onPatch(id, { body: "New Text" })}>Patch</button>
      <button onClick={() => onUpdateOne(id, { body: "New Text" })}>
        Update One
      </button>
    </li>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPatch: PropTypes.func.isRequired,
  onUpdateOne: PropTypes.func.isRequired,
};
export default memo(Comment);

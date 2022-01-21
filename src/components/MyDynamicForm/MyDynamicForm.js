import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "shortid";
import { createState, setAll } from "../../store/MyDynamicFormSlice";

const MyDynamicForm = () => {
  const dispatch = useDispatch();
  const allIds = useSelector((state) => Object.keys(state.myDynamicForm));

  return (
    <div>
      <button onClick={() => dispatch(createState(generate()))}>
        Create Entity Adapter state
      </button>
      {allIds.map((id) => (
        <button
          key={id}
          onClick={() =>
            dispatch(
              setAll({
                id,
                array: [
                  { id: generate(), name: generate(), number: Math.random() },
                ],
              })
            )
          }
        >{`Set All ${id}`}</button>
      ))}
    </div>
  );
};

export default MyDynamicForm;

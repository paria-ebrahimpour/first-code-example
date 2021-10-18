import React from "react";
import { useEffect, useRef } from "react";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";
import { Button, TextField } from "@mui/material";
import useHttp from './../../hooks/use-http';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;
    // optional: Could validate here

    sendRequest({ commentData: { text: enteredText }, mealId: props.mealId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {/* <div className={classes.control} onSubmit={submitFormHandler}> */}
        <TextField
        sx={{width: "70%"}}
        //   ref={commentTextRef}
        inputProps={{ref: commentTextRef}}
          id="comment"
          placeholder="نظر شما"
        //   multiline
          rows={2}
          rowsMax={3}
        />
        {/* <textarea id="comment" rows="2" ref={commentTextRef}></textarea> */}
      {/* </div> */}
      <Button type="submit" onClick={submitFormHandler} className="btn">اضافه کردن نظر</Button>
    </form>
  );
};

export default NewCommentForm;

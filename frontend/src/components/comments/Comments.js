import React from "react";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp2 from "../../hooks/use-http-cm-pd";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import { Button } from '@mui/material';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams();

  const { mealId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp2(getAllComments);

  useEffect(() => {
    sendRequest(mealId);
  }, [mealId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(mealId);
  }, [sendRequest, mealId]);

  let comments;

  if (isLoading) {
    comments = (
      <div className="centered">
        <LoadingSpinner />{" "}
      </div>
    );
  }

  if (!isLoading && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    !isLoading &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">کامنت ندارد</p>;
  }
  return (
    <section className={classes.comments}>
      <h5>نظرات کاربران</h5>
      {!isAddingComment && (
        <Button className="btn" onClick={startAddCommentHandler}>
         اضافه کردن نظر
        </Button>
      )}
      {isAddingComment && (
        <NewCommentForm
          mealId={mealId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;

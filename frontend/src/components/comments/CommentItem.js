import { Card, List } from "@mui/material";
import React from "react";

const CommentItem = (props) => {
  return (
    <List >
      <Card>{props.text}</Card>
    </List>
  );
};

export default CommentItem;

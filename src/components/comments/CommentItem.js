import { Card, List } from "@mui/material";
import React from "react";

const CommentItem = (props) => {
  return (
    <List>
      <Card
        sx={{
          maxWidth: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {props.text}
      </Card>
    </List>
  );
};

export default CommentItem;

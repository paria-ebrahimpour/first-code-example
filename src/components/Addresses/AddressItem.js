import React from "react";
import classes from "./AddressItem.module.css";
import { Button } from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material/";

const TaskItem = (props) => {
  const deleteAddressHandler = () => {
    console.log("deleted");
  };

  return (
    <React.Fragment>
      <li className={classes.task}>{props.children}</li>
    </React.Fragment>
  );
};

export default TaskItem;

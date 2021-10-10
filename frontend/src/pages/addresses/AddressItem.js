import classes from "./AddressItem.module.css";

const TaskItem = (props) => {
  return <li className={classes.task}>{props.children}</li>;
};

export default TaskItem;

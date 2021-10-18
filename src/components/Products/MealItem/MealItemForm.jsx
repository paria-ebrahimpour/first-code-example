import { Grid, Button, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import classes from "./MealItemForm.module.css";
import AuthContext from "../../../store/auth-context";
import ExitCart from './../../Cart/ExitCart';

const MealItemForm = (props) => {
  const [value, setValue] = useState(0);

  const authCtx = useContext(AuthContext);

  const minusHandler = () => {
    if (value <= 0) {
      setValue(0);
    } else {
      setValue(value - 1);
    }
  };
  const plusHandler = () => {
    setValue(value + 1);
  };

  const submitHandler = (event) => {
    if (authCtx.isLoggedIn) {
      event.preventDefault();
      props.onAddToCart(value);
    } else {
    return props.onShowExitCart()
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={6}>
        {/* <Box className={classes.container}> */}
        <Button
          style={{ maxWidth: 23, maxHeight: 23, minWidth: 23, minHeight: 23 }}
          variant="outlined"
          type="button"
          className={classes.counter}
          onClick={plusHandler}
        >
          +
        </Button>
        <input
          // style={{ borderColor: "#2a9d8f" }}
          className={classes.counter}
          // borderColor="primary"
          type="number"
          value={value}
        />
        <Button
          style={{ maxWidth: 23, maxHeight: 23, minWidth: 23, minHeight: 23 }}
          variant="outlined"
          type="button"
          className={classes.counter}
          onClick={minusHandler}
        >
          -
        </Button>
        {/* </Box> */}
      </Grid>
      <Grid item lg={6}>
        <Button variant="contained" type="submit" onClick={submitHandler}>
          اضافه به سبد خرید
        </Button>
      </Grid>
    </Grid>
  );
};

export default MealItemForm;

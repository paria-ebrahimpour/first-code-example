import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
<Grid container spacing ={2}>
<Grid item lg={6}>
<Input
        ref={amountInputRef}
        label="تعداد"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          default1Value: "1",
        }} 
       />


  </Grid>
  <Grid item lg={6}>
  <button> اضافه به سبد خرید</button>
  </Grid>
</Grid>
     
    
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

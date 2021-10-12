import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material/";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price} تومان`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <React.Fragment>
      {/* <li className={classes.meal}>
      <div>
      <img className={classes.image} src={props.image}/>
        <h3 className={classes.name}>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li> */}

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography align="center" variant="body1" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="h6" color="text.error">
            قیمت: {props.price} تومان
          </Typography>
        </CardContent>
        <CardActions>
          <MealItemForm onAddToCart={addToCartHandler} />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default MealItem;

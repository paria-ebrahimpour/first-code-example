import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from '@mui/material';


const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      });
    }

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 345 }}>
          <CardActionArea href={`/meals/${props.id}`}>
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
        </CardActionArea>
        <CardActions>
          <MealItemForm onShowExitCart={props.onShowExitCart} onAddToCart={addToCartHandler} />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default MealItem;

import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MealItemForm from '../Products/MealItem/MealItemForm'
import CartContext from "../../store/cart-context";

const ProductPage = (props) => {
  const theme = useTheme();
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
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <CardMedia
        component="img"
        sx={{ width: 180 }}
        image={props.image}
        alt="تصویر غذا"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.description}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.price}
          </Typography>
          <MealItemForm onShowExitCart={props.onShowExitCart} onAddToCart={addToCartHandler} />
        </CardContent>

      </Box>
    </Card>
  );
};

export default ProductPage;

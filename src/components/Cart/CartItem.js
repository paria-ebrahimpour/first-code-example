import classes from "./CartItem.module.css";
import { Button } from "@mui/material";

const CartItem = (props) => {
  const price = `تومان ${props.price}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          style={{
            padding: 0,
            maxWidth: "25px",
            maxHeight: "25px",
            minWidth: "30px",
            minHeight: "25px",
          }}
          color="secondary"
          onClick={props.onRemove}
        >
          −
        </Button>
        <Button
          style={{
            padding: 0,
            maxWidth: "25px",
            maxHeight: "25px",
            minWidth: "30px",
            minHeight: "25px",
          }}
          color="secondary"
          onClick={props.onAdd}
        >
          +
        </Button>
      </div>
    </li>
  );
};

export default CartItem;

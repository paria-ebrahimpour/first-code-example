import React, { useContext, useEffect, useState } from "react";
// import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderOrderButton.module.css";
import CartContext from './../../store/cart-context';

const HeaderOrderButton = (props) => {
  const [btnHighlighted, setBtnIsHighlited] = useState(false);

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlited(true);

    const timer = setTimeout(() => {
      setBtnIsHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return <button className={btnClasses} onClick={props.onClick}></button>;
};

export default HeaderOrderButton;

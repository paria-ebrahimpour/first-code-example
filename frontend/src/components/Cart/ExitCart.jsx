import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const ExitCart = (props) => {
  const [didExit, setDidExit] = useState(false);

  const authCtx = useContext(AuthContext);

  const lougoutHandler = () => {
    setDidExit(true);
    authCtx.logout();
  };

  const didExitModalContent = (
    <React.Fragment>
      <p>آیا می خواهید از حساب خارج شوید؟</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={lougoutHandler}>
          خروج از حساب کاربری
        </button>
        <button className={classes["button"]} onClick={props.onClose}>
          بستن
        </button>
      </div>
    </React.Fragment>
  );

  const didExitedModalContent = (
    <React.Fragment>
      <p>با موفقیت از حساب خارج شد</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          بستن
        </button>
      </div>
    </React.Fragment>
  );

  let exit = (
    <React.Fragment>
  <p>شما وارد حساب خود نشده اید</p>
      <Button href="/sign-in" variant="contained">ورود به حساب کاربری</Button>
    </React.Fragment>
  )

  if (authCtx.isLoggedIn && !didExit) {
    exit=(
    <React.Fragment>
    <p>آیا می خواهید از حساب خارج شوید؟</p>
    <div className={classes.actions}>
      <button className={classes["button"]} onClick={lougoutHandler}>
        خروج از حساب کاربری
      </button>
      <button className={classes["button"]} onClick={props.onClose}>
        بستن
      </button>
    </div>
  </React.Fragment>)
  } if (!authCtx.isLoggedIn && didExit){
    exit= (
      <React.Fragment>
      <p>با موفقیت از حساب خارج شد</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          بستن
        </button>
      </div>
    </React.Fragment>
    )
  }


   let content = exit 

  return (
    <Modal onClose={props.onClose}>
      {content}
      {/* <React.Fragment>
        {!didExit && didExitModalContent}
        {didExit && didExitedModalContent}
        {!authCtx.isLoggedIn && <p>شما وارد حساب خود نشده اید</p>}
      </React.Fragment> */}
    </Modal>
  );
};

export default ExitCart;

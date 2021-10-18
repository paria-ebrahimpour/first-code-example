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
        <button className={classes["button"]} onClick={props.onClose}>
          بستن
        </button>
        <button className={classes["button"]} onClick={lougoutHandler}>
          خروج از حساب کاربری
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

  return (
    <Modal onClose={props.onClose}>
      <React.Fragment>
        {!didExit && didExitModalContent}
        {didExit && didExitedModalContent}
      </React.Fragment>
    </Modal>
  );
};

export default ExitCart;

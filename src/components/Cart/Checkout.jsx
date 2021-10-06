import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState(true);

  const streetInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredStreet = streetInputRef.current.value;

    const enteredStreetIsValid = !isEmpty(enteredStreet);

    setFormInputValidity({
      street: enteredStreetIsValid,
    });

    const formIsValid = enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      street: enteredStreet,
    });
  };

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={streetControlClasses}>
        <label htmlFor="street">انتخاب آدرس</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && (
          <p>لطفا آدرس مورد نظر خود را انتخاب کنید</p>
        )}
      </div>

      {/* <div className={cityControlClasses}>
        <label htmlFor="city">انتخاب آدرس</label>
        <SelectItem />
        {!formInputValidity.city && (
          <p>لطفا آدرس مورد نظر خود را انتخاب کنید</p>
        )}
      </div> */}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          بستن
        </button>
        <button className={classes.submit}>ثبت سفارش</button>
      </div>
    </form>
  );
};

export default Checkout;

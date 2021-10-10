import { useRef, useState } from "react";
import classes from "./AddAddress.module.css";
import Section from "../../components/UI/Section";
import useHttp from "../../hooks/use-http";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length === 10;

const AddAddress = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    address: true,
    postalCode: true,
    city: true,
  });

  const { error } = useHttp();

  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredAddress = addressInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isTenChars(enteredpostal);

    setFormInputValidity({
      address: enteredAddressIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredCityIsValid && enteredPostalIsValid && enteredAddressIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      address: enteredAddress,
      postalCode: enteredpostal,
      city: enteredCity,
    });
  };

  const addressControlClasses = `${classes.control} ${formInputValidity.address ? "" : classes.invalid
    }`;
  const postalControlClasses = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid
    }`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid
    }`;

  return (
    <Section>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={cityControlClasses}>
          <label htmlFor="city">شهر</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputValidity.city && <p>لطفا شهر خود را وارد کنید</p>}
        </div>
        <div className={addressControlClasses}>
          <label htmlFor="street">آدرس</label>
          <input type="text" id="street" ref={addressInputRef} />
          {!formInputValidity.address && <p>لطفا آدرس خود را وارد کنید</p>}
        </div>
        <div className={postalControlClasses}>
          <label htmlFor="postal">کد پستی</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formInputValidity.postalCode && (
            <p>لطفا کد پستی معتبر اضافه کنید</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            ثبت آدرس
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </Section>
  );
};

export default AddAddress;

import { useRef, useState } from "react";
import classes from "./AddInfo.module.css";
import Section from "../../components/UI/Section";
import useHttp from "../../hooks/use-http";

const isEmpty = (value) => value.trim() === "";
const isElevenChars = (value) => value.trim().length === 11;

const AddInfo = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    lastName: true,
    mobile: true,
    firstName: true,
  });

  const { error } = useHttp();

  const lastNameInputRef = useRef();
  const mobileInputRef = useRef();
  const firstNameInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredlastName = lastNameInputRef.current.value;
    const enteredmobile = mobileInputRef.current.value;
    const enteredfirstName = firstNameInputRef.current.value;

    const enteredlastNameIsValid = !isEmpty(enteredlastName);
    const enteredfirstNameIsValid = !isEmpty(enteredfirstName);
    const enteredmobileIsValid = isElevenChars(enteredmobile);

    setFormInputValidity({
      lastName: enteredlastNameIsValid,
      mobile: enteredmobileIsValid,
      firstName: enteredfirstNameIsValid,
    });

    const formIsValid =
      enteredfirstNameIsValid && enteredmobileIsValid && enteredlastNameIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      lastName: enteredlastName,
      mobile: enteredmobile,
      firstName: enteredfirstName,
    });
  };

  const lastNameControlClasses = `${classes.control} ${formInputValidity.lastName ? "" : classes.invalid
    }`;
  const mobileControlClasses = `${classes.control} ${formInputValidity.mobile ? "" : classes.invalid
    }`;
  const firstNameControlClasses = `${classes.control} ${formInputValidity.firstName ? "" : classes.invalid
    }`;

  return (
    <Section>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={firstNameControlClasses}>
          <label htmlFor="firstname">نام</label>
          <input type="text" id="firstname" ref={firstNameInputRef} />
          {!formInputValidity.firstName && <p>لطفا نام خود را وارد کنید</p>}
        </div>
        <div className={lastNameControlClasses}>
          <label htmlFor="lastname">نام خانوادگی</label>
          <input type="text" id="lastname" ref={lastNameInputRef} />
          {!formInputValidity.lastName && <p>لطفا نام خانوادگی خود را وارد کنید</p>}
        </div>
        <div className={mobileControlClasses}>
          <label htmlFor="mobile">شماره همراه</label>
          <input placeholder="09..." type="text" id="mobile" ref={mobileInputRef} />
          {!formInputValidity.mobile && (
            <p>لطفا شماره تماس معتبر اضافه کنید</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            ثبت اطلاعات
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </Section>
  );
};

export default AddInfo;

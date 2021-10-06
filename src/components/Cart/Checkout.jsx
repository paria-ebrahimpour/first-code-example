import React, { useEffect, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState(true);
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);

  // const streetInputRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://first-pwa-4cb00-default-rtdb.firebaseio.com/addresses.json"
      );
      const responseData = await response.json();
      const loadedOrders = [];
      for (const a in responseData) {
        loadedOrders.push({
          id: a,
          city: responseData[a].city,
          address: responseData[a].address,
        });
      }
      setOrders(loadedOrders);
    };
    fetchOrders();
  }, []);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredStreet = streetInputRef.current.value;

    // const enteredStreetIsValid = !isEmpty(enteredStreet);

    // setFormInputValidity({
    //   street: enteredStreetIsValid,
    // });

    // const formIsValid = enteredStreetIsValid;

    // if (!formIsValid) {
    //   return;
    // }
    setAddress(event.target.value);
    console.log(orders);
    props.onConfirm({
      street: orders,
    });
  };

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {/* <div className={streetControlClasses}>
        <label htmlFor="street">انتخاب آدرس</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && (
          <p>لطفا آدرس مورد نظر خود را انتخاب کنید</p>
        )}
      </div> */}

      <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="demo-simple-select-standard-label">
          آدرس مورد نظر
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // defaultValue={orders}
          onChange={handleChange}
          label="address"
          type="submit"
        >
          {orders.map((ad) => (
            <MenuItem
              value={orders}
              // key={address.id}
              // id={address.id}
              // city={address.city}
              // address={address.address}
            >
              <span>
                {ad.city} - {ad.address}
              </span>
            </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>

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

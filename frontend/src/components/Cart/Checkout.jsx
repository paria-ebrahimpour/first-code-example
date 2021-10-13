import React, { useEffect, useState } from "react";
import classes from "./Checkout.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

// const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  // const [formInputValidity, setFormInputValidity] = useState(true);
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
    // if (orders > 0) {
    //   setHadAdress(true);
    // } else {
    //   setHadAdress(false);
    // }
    fetchOrders();
  }, []);

  const changeHandler = (event) => {
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

    props.onConfirm({
      street: address,
    });
  };

  let addresslist = (
    <React.Fragment>
      <h4>آدرسی وجود ندارد. لطفا آدرس خود را وارد کنید</h4>
      <Button variant="contained" href="/my-account/addresses">
        ثبت آدرس
      </Button>
    </React.Fragment>
  );

  if (orders.length > 0) {
    addresslist = (
      <form className={classes.form} onSubmit={confirmHandler}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
          <InputLabel id="demo-simple-select-standard-label">
            آدرس مورد نظر
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={changeHandler}
            value={address}
            label="address"
            type="submit"
          >
            {orders.map((orders) => (
              <MenuItem
                value={orders}
                // key={ad.id}
                // id={ad.id}
                // city={ad.city}
                // address={ad.address}
              >
                <span>
                  {orders.city} - {orders.address}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            بستن
          </button>
          <button type="submit" className={classes.submit}>ثبت سفارش</button>
        </div>
      </form>
    );
  }

  let content = addresslist;
  // const streetControlClasses = `${classes.control} ${
  //   formInputValidity.street ? "" : classes.invalid
  // }`;

  return (
    <React.Fragment>
      {content}
      {/* <form className={classes.form} onSubmit={confirmHandler}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
          <InputLabel id="demo-simple-select-standard-label">
            آدرس مورد نظر
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={changeHandler}
            label="address"
            type="submit"
          >
            {orders.map((ad) => (
              <MenuItem
                value={orders}
                // key={ad.id}
                // id={ad.id}
                // city={ad.city}
                // address={ad.address}
              >
                <span>
                  {ad.city} - {ad.address}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            بستن
          </button>
          <button className={classes.submit}>ثبت سفارش</button>
        </div>
      </form> */}
    </React.Fragment>
  );
};

export default Checkout;

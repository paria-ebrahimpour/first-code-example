import React from "react";
import AddAddress from "../components/Addresses/AddAddress";
import AddressList from "../components/Addresses/AddressList";

const Addresses = (props) => {
  const submitAddressHandler = async (userData) => {
    await fetch(
      "https://ganjine-5cf10-default-rtdb.firebaseio.com/addresses.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
  };

  return (
    <React.Fragment>
      <h1 style={{ fontSize: 23 }}>آدرس های کاربر</h1>
      <AddAddress onConfirm={submitAddressHandler} />
      <AddressList />
    </React.Fragment>
  );
};

export default Addresses;

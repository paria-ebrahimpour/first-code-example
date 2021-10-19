import React from "react";
import AddAddress from "./AddAddress";
import AddressList from "./AddressList";

const Addresses = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [didSubmit, setDidSubmit] = useState(false);

  const submitAddressHandler = async (userData) => {
    // setIsLoading(true);
    await fetch(
      "https://first-pwa-4cb00-default-rtdb.firebaseio.com/addresses.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    // setIsLoading(false)
    // setDidSubmit(true)
  };

  return (
    <React.Fragment>
    <h1 style={{fontSize: 23}}>آدرس های کاربر</h1>
      <AddAddress onConfirm={submitAddressHandler} />
      <AddressList />
    </React.Fragment>
  );
};

export default Addresses;

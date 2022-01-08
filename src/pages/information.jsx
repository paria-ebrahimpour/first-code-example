import React from "react";
import AddInfo from "../components/Profile/AddInfo";

function UserInformation() {
  const submitInfoHandler = async (userData) => {
    await fetch(
      "https://ganjine-5cf10-default-rtdb.firebaseio.com/userinfo.json",
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
      <h1 style={{ fontSize: 23 }}>اطلاعات کاربری</h1>
      <AddInfo onConfirm={submitInfoHandler} />
    </React.Fragment>
  );
}

export default UserInformation;

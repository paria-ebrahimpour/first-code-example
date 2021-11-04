import React, { useState } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { NavLink } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function BottomNavigation() {
  const [value, setValue] = useState("products");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const BottomNavigation = styled("div")(({ theme }) => ({
    position: "fixed",
    bottom: 0
  }));

  return (
    <BottomNavigation sx={{ position: 'fixed', justifyContent: "space-around", bottom: 0, left: 0, right: 0, backgroundColor: "#f54748"}} value={value} onChange={handleChange} className="navbar">
      <BottomNavigationAction
        value="myAccount"
        component={NavLink}
        to="/my-account"
        label="داشبورد"
        icon={<AccountCircle />}
      />
      <BottomNavigationAction
        value="products"
        to="/"
        component={NavLink}
        label="محصولات"
        icon={<FastfoodRoundedIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/orderlist"
        value="orderlist"
        label="سفارش ها"
        icon={<ShoppingCartRoundedIcon />}
      />
    </BottomNavigation>
  );
}

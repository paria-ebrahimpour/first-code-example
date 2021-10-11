import React, { useState } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { NavLink } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import classes from "./BottomAppBar.module.css";
// import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material/";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function BottomNavigation() {
  const [value, setValue] = useState("products");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const BottomNavigation = styled("div")(({ theme }) => ({
    // width: "100%",
    position: "fixed",
    bottom: 0,
    // alignContent: "space-between",
    // alignItems: "center",
  }));

  return (
    <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "#2a9d8f"}} value={value} onChange={handleChange} className="navbar">
      <BottomNavigationAction
      // color="inherit"
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

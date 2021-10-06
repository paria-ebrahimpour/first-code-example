import React, { useState } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { NavLink } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import classes from "./BottomAppBar.module.css";
// import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

export default function LabelBottomNavigation() {
  const [value, setValue] = useState("products");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const BottomNavigation = styled("div")(({ theme }) => ({
    // width: "100%",
    position: "fixed",
    bottom: 0,
    alignContent: "space-between",
    alignItems: "center",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor:
    // alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    // marginRight: theme.spacing(2),
    // margin: 0,
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
  }));

  // const BottomNavigationAction = styled("div")(({ theme }) => ({
  //   color: "#2a9d8f",
  // }));
  return (
    <BottomNavigation sx={{ width: 1 }} value={value} onChange={handleChange}>
      {" "}
      <BottomNavigationAction
        backgroundColor="error"
        component={NavLink}
        to="/my-account"
        label="داشبورد"
        value="myAccount"
        icon={<AccountBoxRoundedIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/"
        label="محصولات"
        value="products"
        icon={<FastfoodRoundedIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/orderlist"
        label="سفارش ها"
        value="orderlist"
        icon={<ShoppingCartRoundedIcon />}
      />
    </BottomNavigation>
  );
}

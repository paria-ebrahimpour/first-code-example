import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
// import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AuthContext from "../store/auth-context";

const OrderList = () => {
  const [value, setValue] = useState("1");
  const authCtx = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isLoggedInContent = (
    <React.Fragment>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="سفارش های قبلی" value="1" />
              <Tab label="سفارش های فعال" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">سفارش های قبلی</TabPanel>
          <TabPanel value="2">سفارش های فعال</TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );

  const isntLoggedInContent = (
    <React.Fragment>
      <p>برای مشاهده سفارش های خود وارد حساب کاربری شوید</p>
      <Button
        href="/sign-in"
        type="signin"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        ورود به حساب کاربری
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && isLoggedInContent}
      {!authCtx.isLoggedIn && isntLoggedInContent}
    </React.Fragment>
  );
};

export default OrderList;

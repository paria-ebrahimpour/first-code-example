import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import Section from "../components/UI/Section";
import AddressItem from "./addresses/AddressItem";
import classes from "./addresses/AddressList.module.css";

const OrderList = () => {
  const [value, setValue] = useState("1");
  const authCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const { isLoading, error } = useHttp();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://first-pwa-4cb00-default-rtdb.firebaseio.com/orders.json"
      );
      const responseData = await response.json();
      const loadedOrders = [];
      for (const a in responseData) {
        loadedOrders.push({
          id: a,
          amount: responseData[a].orderItems[0].amount,
          name: responseData[a].orderItems[0].name,
          price: responseData[a].orderItems[0].price,
          // user: responseData[a].user.street,
        });
      }
      setOrders(loadedOrders);
    };
    fetchOrders();
  }, []);

  let addressList = (
    <React.Fragment>
      <h2>آدرسی وجود ندارد. لطفا آدرس خود را وارد کنید</h2>;
      <Button href="/my-account/addresses">ثبت آدرس</Button>
    </React.Fragment>
  );

  if (orders.length > 0) {
    addressList = (
      <ul>
        {orders.map((order) => (
          <AddressItem
            key={order.id}
            id={order.id}
            orderItems={order.orderItems}
            address={order.user}
          >
            <span>
              {order.name} - {order.price} - {order.amount} - {order.user}
            </span>
            {/* <p>{order.amount}</p>
            <p>{order.name}</p>
            <p>{order.price}</p>
            <p>{order.user}</p> */}
          </AddressItem>
        ))}
      </ul>
    );
  }

  let content = addressList;

  if (isLoading) {
    content = "در حال پردازش...";
  }

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
          <TabPanel value="1">
            <Section>
              <div className={classes.container}>{content}</div>
            </Section>
          </TabPanel>
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

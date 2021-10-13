import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AuthContext from "../store/auth-context";
// import useHttp from "../hooks/use-http";
import Section from "../components/UI/Section";
import AddressItem from "./addresses/AddressItem";
import classes from "./addresses/AddressList.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Grid, Card, List } from "@mui/material/";
import LoginCard from "../components/LoginCard";

const OrderList = () => {
  const [value, setValue] = useState("1");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchOrders = async () => {
        const response = await fetch(
          "https://first-pwa-4cb00-default-rtdb.firebaseio.com/orders.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();
        const loadedOrders = [];
        for (const a in responseData) {
          loadedOrders.push({
            id: a,
            amount: responseData[a].orderItems[0].amount,
            name: responseData[a].orderItems[0].name,
            price: responseData[a].orderItems[0].price,
            user: responseData[a].user.street.address,

            //ina bayad dorost she
          });
        }
        setOrders(loadedOrders);
      };
      fetchOrders();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  let addressList = (
    <React.Fragment>
      <h2>سفارشی وجود ندارد</h2>
      {/* <Button href="/">ثبت سفارش</Button> */}
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
              {order.name} - {order.price} - {order.amount} {order.user} 
            </span>
          </AddressItem>
        ))}
      </ul>
    );
  }

  let content = addressList;

  if (isLoading) {
    <LoadingSpinner />;
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
              <Grid xs={6} value="1">
                <Tab label="سفارش های قبلی" />
              </Grid>
              <Grid xs={6} value="2">
                <Tab label="سفارش های فعال" />
              </Grid>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Card>
              <List
                sx={{
                  width: "100%",
                  textAlign: "right",
                  listStyleType: "none",
                }}
              >
                {content}
              </List>
              {/* <div className={classes.container}>{content}</div> */}
            </Card>
          </TabPanel>
          <TabPanel value="2">سفارش های فعال</TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {error && <p>مشلکی پیش آمده، لطفا بعدا تلاش کنید</p>}
      {authCtx.isLoggedIn && isLoggedInContent}
      {!authCtx.isLoggedIn && <LoginCard />}
      {isLoading && <LoadingSpinner />}
    </React.Fragment>
  );
};

export default OrderList;

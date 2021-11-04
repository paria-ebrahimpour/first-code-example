import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AuthContext from "../store/auth-context";
import AddressItem from "../components/Addresses/AddressItem";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Grid, Card } from "@mui/material/";
import LoginCard from "../components/UI/LoginCard";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
          "https://paria-1993-default-rtdb.firebaseio.com/orders.json"
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
      <ul style={{ listStyleType: "none" }}>
        {orders.map((order) => (
          <AddressItem
            key={order.id}
            id={order.id}
            orderItems={order.orderItems}
            address={order.user}
          >
            <Card sx={{ maxWidth: 700, display: "flex", alignItems: "center", justifyContent:"center", margin: "auto"}}>
              <Box sx={{ display: "flex", flexDirection: "column" }} >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    نام غذا: {order.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    تعداد: {order.amount}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="subtitle1">
                    قیمت: {order.price}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    آدرس: {order.user}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  ></Typography>
                </CardContent>
              </Box>
            </Card>
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
            <TabList onChange={handleChange} label="orders">
              <Grid xs={6} value="1">
                <Tab label="سفارش های قبلی" />
              </Grid>
              <Grid xs={6} value="2">
                <Tab label="سفارش های فعال" />
              </Grid>
            </TabList>
          </Box>
          <TabPanel value="1">{content}</TabPanel>
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

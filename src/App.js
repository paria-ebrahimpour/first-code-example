import React, { useState, Suspense, useContext } from "react";
import HeaderAppBar from "./components/header & footer/HeaderAppBar";
import BottomNavigation from "./components/header & footer/BottomNavigation";
import { Redirect, Route, Switch } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ExitCart from "./components/Cart/ExitCart";
import AuthContext from "./store/auth-context";

const NotFound = React.lazy(() => import("./pages/NotFound"));
const AccountManager = React.lazy(() => import("./pages/AccountManager"));
const OrderList = React.lazy(() => import("./pages/OrderList"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Reset = React.lazy(() => import("./pages/reset-pass"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const ProductList = React.lazy(() => import("./pages/ProductList"));
const Addresses = React.lazy(() => import("./pages/Addresses"));
const ChangePass = React.lazy(() => import("./pages/changePass"));
const Notifications = React.lazy(()=> import( './pages/Notifications'));

const UserInformation = React.lazy(() => import("./pages/information"));

const App = () => {
  const authCtx = useContext(AuthContext);

  const [cartIsShown, setCartIsShown] = useState(false);
  const [exitCartIsShown, setExitCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showExitCartHandler = () => {
    setExitCartIsShown(true);
  };

  const hideExitCartHandler = () => {
    setExitCartIsShown(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <HeaderAppBar
          onShowExitCart={showExitCartHandler}
          onShowCart={showCartHandler}
        />
        <main>
          <Suspense
            fallback={
              <div className="centered">
                <LoadingSpinner />
              </div>
            }
          >
            <Switch>
              {cartIsShown && <Cart onClose={hideCartHandler} />}
              {exitCartIsShown && (
                <ExitCart
                  onClose={hideExitCartHandler}
                  onShowExitCart={showExitCartHandler}
                />
              )}
              <Route path="/" exact>
                <ProductList onShowExitCart={showExitCartHandler} />
              </Route>
              <Route path="/reset" exact>
                <Reset />
              </Route>
              <Route path="/meals/:mealId">
                <ProductDetails onShowExitCart={showExitCartHandler} />
              </Route>
              {/* <Route path="/" exact>
                <Redirect to="/product-list" />
              </Route> */}
              {authCtx.isLoggedIn && (
                <Route path="/new-pass">
                  <ChangePass />
                </Route>
              )}
              {/* <ProtectedRoute path="/new-pass">
                <ChangePass />
                </ProtectedRoute> */}
              <Route path="/my-account" exact>
                <AccountManager onShowExitCart={showExitCartHandler} />
              </Route>
              <Route path="/my-account/notifications">
              {authCtx.isLoggedIn && <Notifications />}
                {!authCtx.isLoggedIn && <Redirect to="/sign-in" />}
              </Route>
              <Route path="/my-account/addresses">
                {authCtx.isLoggedIn && <Addresses />}
                {!authCtx.isLoggedIn && <Redirect to="/sign-in" />}
              </Route>
              <Route path="/my-account/user-information">
                {authCtx.isLoggedIn && <UserInformation />}
                {!authCtx.isLoggedIn && <Redirect to="/sign-in" />}
              </Route>
              <Route path="/orderlist">
                <OrderList />
              </Route>
              {!authCtx.isLoggedIn && (
                <Route path="/sign-in">
                  <SignIn />
                </Route>
              )}
              <Route path="/sign-up">
                {!authCtx.isLoggedIn && <SignUp />}
                {authCtx.isLoggedIn && <Redirect to="/" />}
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </main>
        <footer>
          <BottomNavigation />
        </footer>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;

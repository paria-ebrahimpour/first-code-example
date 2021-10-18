import React, { useState, Suspense, useContext } from "react";
import PrimarySearchAppBar from "./components/header/PrimarySearchAppBar";
import BottomNavigation from "./components/BottomNavigation";
import { Redirect, Route, Switch } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ExitCart from "./components/Cart/ExitCart";
import AuthContext from "./store/auth-context";
// import ProtectedRoute from "./auth/protected-route";
// import SignupButton from "./components/auth-buttons/signup-button";
// import AuthenticationButton from "./components/auth-buttons/authentication-button";

const NotFound = React.lazy(() => import("./pages/NotFound"));
const AccountManager = React.lazy(() => import("./pages/AccountManager"));
const OrderList = React.lazy(() => import("./pages/OrderList"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Reset = React.lazy(() => import("./pages/reset-pass"));
const ProductList = React.lazy(() => import("./pages/ProductList"));
const Addresses = React.lazy(() => import("./pages/addresses/Addresses"));
const ChangePass = React.lazy(() => import("./pages/changePass/changePass"));
const UserInformation  = React.lazy(() => import('./pages/profile/information'));

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
        <PrimarySearchAppBar
          onShowExitCart={showExitCartHandler}
          onShowCart={showCartHandler}
        />
      {/* <AuthenticationButton/>
      <SignupButton/> */}
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
                <ProductList />
              </Route>
              <Route path="/reset" exact>
                <Reset />
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
              <Route path="/my-account/addresses">
                {authCtx.isLoggedIn && <Addresses />}
                {!authCtx.isLoggedIn && <Redirect to="/sign-in" />}
              </Route>
              <Route path="/my-account/user-info">
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

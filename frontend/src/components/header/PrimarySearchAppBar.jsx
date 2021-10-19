import React, { useState, useEffect, useContext } from "react";
import classes from "./HeaderOrderButton.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CartContext from "../../store/cart-context";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import AuthContext from "../../store/auth-context";
import MoreIcon from "@mui/icons-material/MoreVert";
// import AuthenticationButton from "../auth-buttons/authentication-button";
// import SignupButton from "../auth-buttons/signup-button";

const PrimarySearchAppBar = (props) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [btnHighlighted, setBtnIsHighlited] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlited(true);

    const timer = setTimeout(() => {
      setBtnIsHighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLoggedIn = authCtx.isLoggedIn;
  const lougoutHandler = () => {
    authCtx.logout();
  };

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isntLoggedIn = (
    <React.Fragment>
      <Button component={Link} to="/sign-up" color="inherit">
        ثبت نام
      </Button>
      <Button component={Link} to="/sign-in" color="inherit">
        ورود
      </Button>
    </React.Fragment>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={props.onShowExitCart}>خروج از حساب</MenuItem>
      <MenuItem component={Link} to="/new-pass">
        تغییر رمز عبور
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={props.onShowCart}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={numberOfCartItems} color="error">
            <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>
        <p>سبد خرید</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>پیام ها</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>حساب کاربری</p>
      </MenuItem>
    </Menu>
  );

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

  const loggedInIcons = (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          color="inherit"
          className={btnClasses}
          onClick={props.onShowCart}
        >
          <Badge badgeContent={numberOfCartItems} color="error">
            <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {isLoggedIn && renderMobileMenu}
      {isLoggedIn && renderMenu}
    </React.Fragment>
  );

  return (
    <Box
      sx={{ position: "static", top: 0, left: 0, right: 0, marginBottom: 12 }}
      // sx={{ flexGrow: 1 }}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to="/">
              <img width="30px" src={logo} alt="logo" />
            </Link>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <p underline="none" color="white" href="/">
              نام سایت
            </p>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isLoggedIn && isntLoggedIn}
          </Box>
          {isLoggedIn && loggedInIcons}
        </Toolbar>
        {/* {isLoggedIn && renderMenu} */}
      </AppBar>
    </Box>
  );
};

export default PrimarySearchAppBar;

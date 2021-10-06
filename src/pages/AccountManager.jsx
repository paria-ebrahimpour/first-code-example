import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RoomIcon from "@mui/icons-material/Room";
import { useHistory } from "react-router-dom";

const AccountManager = (props) => {
  // const [accountClicked, setAccountClicked] = useState(false);
  // const [addressClicked, setAddressClicked] = useState(false);

  const history = useHistory();

  const accountClickedHandler = () => {
    // setAccountClicked(true);
    return history.push("/my-account/information");
  };

  const addressClickedHandler = () => {
    // setAddressClicked(true);
    return history.push("/my-account/addresses");
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "90%",
        margin: "auto",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          نام و نام خانوادگی کاربر نمایش داده شود
        </ListSubheader>
      }
    >
      <ListItemButton onClick={accountClickedHandler}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="اطلاعات کاربری" />
      </ListItemButton>
      <ListItemButton onClick={addressClickedHandler}>
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="آدرس ها" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="پیام ها" />
      </ListItemButton>
      <ListItemButton onClick={props.onShowExitCart}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="خروج" />
        {/* {cartIsShown && <ExitCart />} */}
      </ListItemButton>
    </List>
  );
};

export default AccountManager;

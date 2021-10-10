import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import photo from "../images/404.png";
// import Item from "@mui/material/Item";

const NotFound = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* <Item> */}
          <div className="centered">
            <p>صفحه مورد نظر پیدا نشد</p>
            <Button to="/">بازگشت به صفحه اصلی</Button>
          </div>
          {/* </Item> */}
        </Grid>
        <Grid item xs={8}>
          {/* <Item> */}
          <img width="400" src={photo} loading="lazy" alt="404" />
          {/* </Item> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NotFound;

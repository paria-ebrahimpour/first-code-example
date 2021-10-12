import React from 'react';
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import classes from "./LoginCard.module.css";


const LoginCard = () => {
    return (  
        <React.Fragment>
        <Box
          className={classes.card}
          sx={{
            width: 450,
            height: 160,
            borderRadius: 11,
            backgroundColor: "#e6ebec",
            padding:"5%",

            "&:hover": {
              backgroundColor: "rgb(209, 207, 207)",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <p>برای مشاهده اطلاعات خود وارد حساب کاربری شوید</p>
          <Button
            href="/sign-in"
            type="signin"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ورود به حساب کاربری
          </Button>
        </Box>
      </React.Fragment>
    );
}
 
export default LoginCard;
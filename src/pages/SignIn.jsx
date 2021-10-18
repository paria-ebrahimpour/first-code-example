import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useInput from "../hooks/use-input";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  // const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const isNotEmpty = (value) => value.trim() !== "";

  const authCtx = useContext(AuthContext);

  const {
    isValid: enteredPassIsValid,
    value: enteredPass,
    hasError: passInputHasError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPassInput,
  } = useInput(isNotEmpty);

  const {
    isValid: enteredEmailIsValid,
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPassIsValid) {
    formIsValid = true;
  }

  //   const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCK_nIMIBkBA9QAa2wILAfnp94r0OaTjs8",
      {
        method: "POST",
        body: JSON.stringify({
          // name: enteredName,
          // lastname: enteredLastName,
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "ثبت نام با خطا مواجه شد!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(enteredPass, enteredEmail);
    resetEmailInput();
    resetPassInput();
  };

  // const emailInputClasses = emailInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  // const passInputClasses = passInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  const signInContent = (
    <Container onSubmit={formSubmissionHandler} component="main" maxWidth="xs" >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width:"95%",
          direction: "column",
          bottom: 0,
          // justifyContent: "center",
          // justify: "center",
          // marginRight: 3,
          // alignContent: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          {/* {isLogin ? ' ورود به حساب کاربری' : 'ثبت نام در سایت'} */}
          ورود به حساب کاربری
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
                id="email"
                label="آدرس ایمیل"
                name="email"
                autoComplete="email"
                value={enteredEmail}
              />
              {emailInputHasError && (
                <p className="error-text">لطفا ایمیل خود را وارد کنید</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onBlur={passBlurHandler}
                onChange={passChangeHandler}
                value={enteredPass}
                name="password"
                label="کلمه عبور"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {passInputHasError && (
                <p className="error-text">لطفا کلمه عبور خود را وارد کنید</p>
              )}
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="signin"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid}
            >
              ورود به حساب کاربری
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  رمز عبود خود را فراموش کردید؟
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"حساب کاربری ندارید؟ ایجاد کنید"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

  return (
    <React.Fragment>
      {!isLoading &&  signInContent}
      {isLoading && <LoadingSpinner />}
    </React.Fragment>
  );
};
export default SignIn;
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useInput from "../hooks/use-input";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../store/auth-context";

const SignUp = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const isNotEmpty = (value) => value.trim() !== "";

  const authCtx = useContext(AuthContext);

  const {
    isValid: enteredLastNameIsValid,
    value: enteredLastName,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

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

  if (enteredEmailIsValid && enteredPassIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK_nIMIBkBA9QAa2wILAfnp94r0OaTjs8",
      {
        method: "POST",
        body: JSON.stringify({
          lastname: enteredLastName,
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
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(enteredLastName, enteredEmail, enteredPass);
    resetEmailInput();
    resetLastNameInput();
    resetPassInput();
  };

  return (
    <Container onSubmit={formSubmissionHandler} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          textAlign: "center",
          width: "89%",
        }}
      >
        <Typography component="h1" variant="h5">
          ثبت نام در سایت
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onBlur={lastNameBlurHandler}
                onChange={lastNameChangeHandler}
                id="lastName"
                label="نام و نام خانوادگی"
                name="lastName"
                autoComplete="lname"
                value={enteredLastName}
              />
              {lastNameInputHasError && (
                <p className="error-text">لطفا نام خانوادگی خود را وارد کنید</p>
              )}
            </Grid>
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="اخبار و اطلاعات جدید به من ایمیل شود"
                // sx={{textAlign: "right", direction: "rtl"}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formIsValid}
          >
            ثبت نام
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                حساب کاربری دارید؟ وارد حساب خود شوید
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isLoading && <LoadingSpinner />}
    </Container>
  );
};
export default SignUp;

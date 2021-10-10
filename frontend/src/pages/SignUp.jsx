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

// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useHistory } from "react-router-dom";
// import {
//   auth,
//   registerWithEmailAndPassword,
//   signInWithGoogle,
// } from "../firebase";
// // import "./Register.css";

// function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [user, loading, error] = useAuthState(auth);
//   const history = useHistory();
//   const register = () => {
//     if (!name) alert("Please enter name");
//     registerWithEmailAndPassword(name, email, password);
//   };
//   useEffect(() => {
//     if (loading) return;
//     if (user) history.replace("/dashboard");
//   }, [user, loading]);
//   return (
//     <div className="register">
//       <div className="register__container">
//         <input
//           type="text"
//           className="register__textBox"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Full Name"
//         />
//         <input
//           type="text"
//           className="register__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="register__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button className="register__btn" onClick={register}>
//           Register
//         </button>
//         <button
//           className="register__btn register__google"
//           onClick={signInWithGoogle}
//         >
//           Register with Google
//         </button>
//         <div>
//           Already have an account? <Link to="/sign-in">Login</Link> now.
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SignUp;

const SignUp = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const isNotEmpty = (value) => value.trim() !== "";

  const authCtx = useContext(AuthContext);

  const {
    isValid: enteredNameIsValid,
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

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

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPassIsValid &&
    enteredLastNameIsValid
  ) {
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
          name: enteredName,
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
        // console.log(data)
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(enteredName, enteredLastName, enteredEmail, enteredPass);
    resetNameInput();
    resetEmailInput();
    resetLastNameInput();
    resetPassInput();
  };

  // const nameInputClasses = nameInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  // const lastNameInputClasses = lastNameInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  // const emailInputClasses = emailInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  // const passInputClasses = passInputHasError
  //   ? "form-control invalid"
  //   : "form-control";
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <Container onSubmit={formSubmissionHandler} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          ثبت نام در سایت
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onBlur={nameBlurHandler}
                onChange={nameChangeHandler}
                value={enteredName}
                required
                fullWidth
                id="firstName"
                label="نام"
                // autoFocus
              />
              {nameInputHasError && (
                <p className="error-text">لطفا نام خود را وارد کنید</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onBlur={lastNameBlurHandler}
                onChange={lastNameChangeHandler}
                id="lastName"
                label="نام خانوادگی"
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
                label="می خواهم اخبار و اطلاعات جدید به من ایمیل شود"
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

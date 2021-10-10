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

// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import {
//   auth,
//   signInWithEmailAndPassword,
//   signInWithGoogle,
// } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// // import "./Login.css";
// import LoadingSpinner from "./../components/UI/LoadingSpinner";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, loading, error] = useAuthState(auth);
//   const history = useHistory();
//   useEffect(() => {
//     if (loading) {
//       <LoadingSpinner />;
//       return;
//     }
//     if (user) history.replace("/");
//   }, [user, loading]);
//   return (
//     <div className="login">
//       <div className="login__container">
//         <input
//           type="text"
//           className="login__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="login__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button
//           className="login__btn"
//           onClick={() => signInWithEmailAndPassword(email, password)}
//         >
//           Login
//         </button>
//         <button className="login__btn login__google" onClick={signInWithGoogle}>
//           Login with Google
//         </button>
//         <div>
//           <Link to="/reset">Forgot Password</Link>
//         </div>
//         <div>
//           Don't have an account? <Link to="/sign-up">Register</Link> now.
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SignIn;

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
      {isLoading && <LoadingSpinner />}
    </Container>
  );
};
export default SignIn;

//   return (

//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>

//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//   );

// export default SignIn;

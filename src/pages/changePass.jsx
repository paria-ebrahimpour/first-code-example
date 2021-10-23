import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./changePass.module.css";

const ChangePass = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPassInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPass = newPassInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCK_nIMIBkBA9QAa2wILAfnp94r0OaTjs8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
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
      })
      .catch((err) => {
        alert(err.message);
      });
    history.replace("/");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">رمز عبور جدید</label>
        <input
          type="password"
          ref={newPassInputRef}
          minLength="7"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>تغییر رمز عبور</button>
      </div>
    </form>
  );
};

export default ChangePass;

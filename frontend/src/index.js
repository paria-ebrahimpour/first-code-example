import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
// import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

ReactDOM.render(
  <React.StrictMode>
   {/* <Auth0ProviderWithHistory> */}
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </Auth0ProviderWithHistory> */}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

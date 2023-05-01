import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="513067274332-u7udvva91ic52gmqlaoei9pt2ppom80p.apps.googleusercontent.com">

  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>,
);

reportWebVitals();
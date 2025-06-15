import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store.jsx";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="881758704913-5pvv9ccjda6c3a9i34l2umfs6dvuc9td.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

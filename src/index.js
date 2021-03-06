import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.register();

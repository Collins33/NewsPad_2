import React from "react";
import Home from "../views/Home/index";
import MyArticles from "../views/MyArticles/index";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/myarticles" component={MyArticles} exact />
  </Switch>
);

export default Routes;
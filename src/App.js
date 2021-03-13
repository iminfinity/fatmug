import React, { useEffect } from "react";
import "./App.scss";

import { Switch, Route, useHistory } from "react-router-dom";

import HomePage from "./pages/home/home";
import SignInPage from "./pages/sign-in/sign-in";
import SignUpPage from "./pages/sign-up/sign-up";
import CreateArticlePage from "./pages/create-article/create-article";
import EditArticlePage from "./pages/edit-article/edit-article";
import UserArticlesPage from "./pages/user-articles/user-articles";
import ArticlePage from "./pages/article/article";
import ErrorPage from "./pages/error/error";

import { auth } from "./firebase/utils";

function App() {
  const history = useHistory();
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) history.push("/sign-in");
    });
  });
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/sign-in" component={SignInPage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route path="/create-article" component={CreateArticlePage} />
      <Route
        exact
        path="/update-article/:articleIndex"
        component={EditArticlePage}
      />
      <Route exact path="/my-articles" component={UserArticlesPage} />
      <Route exact path="/article/:articleId" component={ArticlePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;

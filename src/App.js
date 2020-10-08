import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import LanguagesForm from "./components/LanguagesForm/LanguagesForm";
import PrivateRoute from "./PrivateRouter";
import Login from "./components/Login/Login";
import MatchedUsers from "./components/MatchedUsers/MatchedUsers";
import Chat from "./components/Chat/Chat";

export default function App() {
  return (
    <div>
      <Router>
        <Nav />
        <div className="holder">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/languages" component={LanguagesForm} />
            <PrivateRoute exact path="/matchedusers" component={MatchedUsers} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

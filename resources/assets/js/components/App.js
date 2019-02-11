import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Game from "./GameComponent";

import AuthRoute from './utils/AuthRoute';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
class App extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { isAuthenticated, logoutUser } = this.props;
        return (
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact={true} path="/leaderboard" component = {Leaderboard} />
                  <AuthRoute
                    isAuthenticated={isAuthenticated}
                    exact={true}
                    path="/"
                    component={Leaderboard}
                  />
                  <Route exact={true} path="/userlogin" component= {Login} />
                  <Route exact={true} path="/game" component={Game} />
                </Switch>
              </div>
            </BrowserRouter>
        );
    }
};
const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  return {
    isAuthenticated
  };
};

export default withCookies(
  connect(mapStateToProps)(App)
);


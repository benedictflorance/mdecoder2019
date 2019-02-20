import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Game from "./GameComponent";

import AuthRoute from './utils/AuthRoute';
import { logoutUser, authorizeUser, unAuthorizeUser } from '../actions/User';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
class App extends Component {
    componentWillMount() {
      const { cookies, authorizeUser, unAuthorizeUser } = this.props;
      if (cookies.get('login') === '1') {
        authorizeUser();
      } else {
        unAuthorizeUser();
      }
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
                    component={Dashboard}
                  />
                  <Route exact={true} path="/userlogin" component= {Login} />
                  <Route exact={true} path="/game" component={Game} />
                  <Route exact={true} path="/dashboard" component={Dashboard} />
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
  connect(mapStateToProps, { logoutUser, authorizeUser, unAuthorizeUser })(App)
);


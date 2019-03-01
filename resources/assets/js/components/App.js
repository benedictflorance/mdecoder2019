import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Game from "./GameComponent";
import Instructions from './InstructionsComponent';
import AuthRoute from './utils/AuthRoute';
import { logoutUser, authorizeUser, unAuthorizeUser } from '../actions/User';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Base from '../globalVariables';
const styles = {
  grid: { padding: '0px', margin: '0px', minHeight: '100vh',marginTop:'0px !important', },
};
import PageNotFound from './pageNotFound';
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
            <BrowserRouter >
              <div style={styles.grid}>
                <Switch>
                  <Route exact={true} path="/mdecoder/leaderboard" component = {Leaderboard} />
                  <AuthRoute
                    isAuthenticated={isAuthenticated}
                    exact={true}
                    path="/mdecoder/"
                    component={Dashboard}
                  />
                  <Route exact={true} path="/mdecoder/userlogin" component= {Login} />
                  <Route exact={true} path="/mdecoder/game" component={Game} />
                  <Route exact={true} path="/mdecoder/dashboard" component={Dashboard} />
                  <Route exact={true} path='/mdecoder/instructions' component={Instructions} />
                  <Route component={PageNotFound} />
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


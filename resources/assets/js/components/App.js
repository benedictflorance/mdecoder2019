import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import ScrollableTabsButtonAuto from "./QuestionTab"
import SimpleAppBar from "./Timer"
import Login from "./Login"
import bottomNavigation from './bottomNavigation';
import QuestionBox from "./QuestionBox";
import AnswerBox from "./AnswerBox";
import Navbar from './navbar';
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


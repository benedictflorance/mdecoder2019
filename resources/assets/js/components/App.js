import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard"
import Login from "./Login"
import bottomNavigation from './bottomNavigation';
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/leaderboard" component = {bottomNavigation} />
                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}

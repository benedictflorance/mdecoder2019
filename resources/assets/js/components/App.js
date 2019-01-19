import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard"
import ScrollableTabsButtonAuto from "./QuestionTab"
import Login from "./Login"
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/leaderboard" component = {ScrollableTabsButtonAuto} />
                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}

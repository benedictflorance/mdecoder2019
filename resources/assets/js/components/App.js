import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard"
import ScrollableTabsButtonAuto from "./QuestionTab"
import SimpleAppBar from "./Timer"
import Login from "./Login"
import bottomNavigation from './bottomNavigation';
import QuestionBox from "./QuestionBox";
import AnswerBox from "./AnswerBox";
import Navbar from './navbar';
export default class App extends Component {
    render() {
        
        return (
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/leaderboard" component = {Leaderboard} />
                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}


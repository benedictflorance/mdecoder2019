import { combineReducers } from 'redux';

import questions from './questions';
import dashboard from './dashboard';
import user from './user';
import leaderboard from './leaderboard';
import message from './message';
import loading from './responseLoader';

export default combineReducers({
  questions,
  dashboard,
  user,
  leaderboard,
  message,
  loading
});

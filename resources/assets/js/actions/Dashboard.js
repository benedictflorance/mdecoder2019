import api from '../api';

export function updateSelectedQuestion(id) {
  return dispatch => {
    dispatch({ type: 'UPDATE_SELECTED_QUESTION', payload: id });
  };
}

export function updateScore(score) {
  return dispatch => {
    dispatch({ type: 'UPDATE_SCORE', payload: score });
  };
}

export function getUserRemainingTime() {
  return dispatch => {
    // dispatch({
    //   type: 'UPDATE_REMAINING_TIME',
    //   remainingTime: 7200
    // });
    api
      .get('/user/time')
      .then(response => {
        if (response.status === 200) {
          if (response.data.gotRemainingTime) {
            dispatch({
              type: 'UPDATE_REMAINING_TIME',
              remainingTime: response.data.remainingTime
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'GET_REMAINING_TIME_FAILURE',
              message: 'No remaining time'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'GET_REMAINING_TIME_FAILURE',
            message: response.data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'GET_REMAINING_TIME_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Error occured when trying to get remaining time',
          err: err
        });
      });
  };
}

export function getContestRemainingTime() {
  return dispatch => {
    /*dispatch({
      type: 'UPDATE_REMAINING_TIME',
      remainingTime: 18000,
      isContestLive: false
    });*/
    api
      .get('/contest/time')
      .then(response => {
        if (response.status === 200) {
          if (response.data.isContestLive === true) {
            if (response.data.gotRemainingTime) {
              dispatch({
                type: 'UPDATE_REMAINING_TIME',
                remainingTime: response.data.remainingTime,
                isContestLive: true
              });
            } else {
              dispatch({
                type: 'ERROR',
                messageType: 'GET_REMAINING_TIME_FAILURE',
                message: 'No remaining time'
              });
            }
          } else if (response.data.isContestLive === false) {
            dispatch({
              type: 'UPDATE_REMAINING_TIME',
              remainingTime: response.data.remainingTime,
              isContestLive: false
            });
            dispatch({
              type: 'ERROR',
              messageType: 'GET_REMAINING_TIME_FAILURE',
              message: 'Contest is not live'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'GET_REMAINING_TIME_FAILURE',
            message: response.data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'GET_REMAINING_TIME_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Error occured when trying to get remaining time',
          err: err
        });
      });
  };
}

export function getUserScore() {
  return dispatch => {
    /*dispatch({
      type: 'UPDATE_SCORE_SUCCESS',
      payload: {
        user_id: 61,
        user_rank: 53,
        score: 0,
        username: 'Placeholder Name',
        email: 'asdflaskdjf@asdfadf.asdfasdf'
      }
    });*/
    api
      .get('/users/score')
      .then(response => {
        if (response.status === 200) {
          if (response.data.gotScores) {
            dispatch({
              type: 'UPDATE_SCORE_SUCCESS',
              payload: response.data.loggedInUserScore
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'UPDATE_SCORE_FAILURE',
              message: 'No scores available'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'UPDATE_SCORE_FAILURE',
            message: response.data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'UPDATE_SCORE_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Unable to update score',
          err: err
        });
      });
  };
}

import api from '../api';

export function loginUser(email, password) {
  return dispatch => {
    dispatch({ type: 'START_LOADING' });

    /*dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
    dispatch({ type: 'FLUSH_QUESTIONS_STATE' });
    dispatch({ type: 'FLUSH_USER_ACTION_STATE' });
    dispatch({
      type: 'MESSAGE',
      messageType: 'LOGIN_SUCCESS',
      message: 'Successfully Logged In'
    });
    dispatch({ type: 'AUTHORIZE_USER' });
    dispatch({ type: 'STOP_LOADING' });*/
    api
      .post('/auth/login', {
        email: email,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.authenticated) {
            dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
            dispatch({ type: 'FLUSH_QUESTIONS_STATE' });
            dispatch({ type: 'FLUSH_USER_ACTION_STATE' });
            dispatch({
              type: 'MESSAGE',
              messageType: 'LOGIN_SUCCESS',
              message: 'Successfully Logged In'
            });
            dispatch({ type: 'AUTHORIZE_USER' });
            dispatch({ type: 'STOP_LOADING' });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'LOGIN_FAILURE',
              message: 'Login Failed'
            });
            dispatch({ type: 'UNAUTHORIZE_USER' });
            dispatch({ type: 'STOP_LOADING' });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'LOGIN_FAILURE',
            message: response.data.message
          });
          dispatch({ type: 'UNAUTHORIZE_USER' });
          dispatch({ type: 'STOP_LOADING' });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'LOGIN_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Unable to Log In',
          err: err
        });
        dispatch({ type: 'UNAUTHORIZE_USER' });
        dispatch({ type: 'STOP_LOADING' });
      });
  };
}

export function logoutUser() {
  return dispatch => {
    /*dispatch({
      type: 'MESSAGE',
      messageType: 'LOGOUT_SUCCESS',
      message: 'Successfully Logged Out'
    });
    dispatch({ type: 'UNAUTHORIZE_USER' });
    dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
    dispatch({ type: 'FLUSH_QUESTIONS_STATE' });
    dispatch({ type: 'FLUSH_USER_ACTION_STATE' });*/
    api
      .post('/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'MESSAGE',
            messageType: 'LOGOUT_SUCCESS',
            message: 'Successfully Logged Out'
          });
          dispatch({ type: 'UNAUTHORIZE_USER' });
          dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
          dispatch({ type: 'FLUSH_QUESTIONS_STATE' });
          dispatch({ type: 'FLUSH_USER_ACTION_STATE' });
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'LOGOUT_FAILURE',
            message: response.data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'LOGOUT_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Unable to Log Out',
          err: err
        });
      });
  };
}

export function toggleDay() {
  return dispatch => {
    dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
    dispatch({ type: 'FLUSH_QUESTIONS_STATE' });
    dispatch({ type: 'FLUSH_USER_ACTION_STATE' });
  };
}

export function authorizeUser() {
  return dispatch => {
    dispatch({
      type: 'AUTHORIZE_USER'
    });
  };
}

export function unAuthorizeUser() {
  return dispatch => {
    dispatch({
      type: 'UNAUTHORIZE_USER'
    });
  };
}

export function showErrorMessage(msg) {
  return dispatch => {
    dispatch({
      type: 'ERROR',
      messageType: 'Missing fields',
      message: msg
    });
  };
}

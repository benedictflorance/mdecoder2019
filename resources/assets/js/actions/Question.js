import api from '../api';

import {
  getUserRemainingTime,
  getContestRemainingTime,
  updateSelectedQuestion,
  getUserScore
} from './Dashboard';

export function getQuestions(currDayFlag) {
  return dispatch => {
    dispatch({ type: 'FLUSH_DASHBOARD_STATE' });
    // dispatch({
    //   type: 'GET_QUESTIONS_SUCCESS',
    //   payload: [
    //     {
    //       id: 1,
    //       description:
    //         'Aut quibusdam autem quia dolorem corrupti voluptatum. answer : At sunt.',
    //       day: 2,
    //       max_number_of_tries: 7,
    //       question_difficulty: 'est',
    //       remaining_attempts: 7,
    //       user_solved: false,
    //       number_solved: 2
    //     },
    //     {
    //       id: 11,
    //       description:
    //         'Delectus qui praesentium occaecati vel. answer : Placeat tenetur.',
    //       day: 2,
    //       max_number_of_tries: 3,
    //       question_difficulty: 'est',
    //       remaining_attempts: 3,
    //       user_solved: false,
    //       number_solved: 2
    //     },
    //     {
    //       id: 25,
    //       description:
    //         'Quia eos corporis itaque autem doloribus quidem eius. answer : Magnam labore.',
    //       day: 2,
    //       max_number_of_tries: 4,
    //       question_difficulty: 'est',
    //       remaining_attempts: 4,
    //       user_solved: false,
    //       number_solved: 3
    //     },
    //     {
    //       id: 26,
    //       description:
    //         'Asperiores eum ratione fugit asperiores exercitationem. answer : Sunt.',
    //       day: 2,
    //       max_number_of_tries: 4,
    //       question_difficulty: 'est',
    //       remaining_attempts: 4,
    //       user_solved: false,
    //       number_solved: 1
    //     },
    //     {
    //       id: 34,
    //       description: 'Voluptas placeat sunt earum totam. answer : Nulla.',
    //       day: 2,
    //       max_number_of_tries: 2,
    //       question_difficulty: 'est',
    //       remaining_attempts: 2,
    //       user_solved: false,
    //       number_solved: 2
    //     },
    //     {
    //       id: 46,
    //       description:
    //         'Impedit delectus odit aut accusamus tempore nostrum qui. answer : Eveniet.',
    //       day: 2,
    //       max_number_of_tries: 5,
    //       question_difficulty: 'est',
    //       remaining_attempts: 5,
    //       user_solved: false,
    //       number_solved: 1
    //     }
    //   ]
    // });
    // dispatch(getUserScore());
    // dispatch(
    //   currDayFlag === 1 ? getContestRemainingTime() : getUserRemainingTime()
    // );
    // dispatch({
    //   type: 'UPDATE_DIFFICULTY',
    //   payload: 'hard'
    // });
    // dispatch(updateSelectedQuestion(1));
    // dispatch({
    //   type: 'SET_CURR_DAY_FLAG',
    //   payload: currDayFlag
    // });

    api
      .get('/questions', {
        params: {
          prev_day_questions_flag: currDayFlag
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.gotQuestions) {
            dispatch({
              type: 'GET_QUESTIONS_SUCCESS',
              payload: response.data.data
            });
            dispatch(getUserScore());
            dispatch(
              currDayFlag === 1
                ? getContestRemainingTime()
                : getUserRemainingTime()
            );
            dispatch({
              type: 'UPDATE_DIFFICULTY',
              payload: response.data.data[0].question_difficulty
            });
            dispatch(updateSelectedQuestion(response.data.data[0].id));
            dispatch({
              type: 'SET_CURR_DAY_FLAG',
              payload: currDayFlag
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'GET_QUESTIONS_FAILURE',
              message: 'Cannot get Questions'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'GET_QUESTIONS_FAILURE',
            message: response ? response.data.message : 'Cannot get Questions'
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'GET_QUESTIONS_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Cannot get Questions',
          err: err
        });
        if (err.status === 401) {
          dispatch({ type: 'UNAUTHORIZE_USER' });
        }
      });
  
  };
}
export function submitAnswer(questionId, answer) {
  return dispatch => {
    dispatch({ type: 'DISABLE_SUBMIT' });
    // dispatch({
    //   type: 'MESSAGE',
    //   messageType: 'SUBMIT_ANSWER_SUCCESS',
    //   message: 'Wrong Answer'
    // });
    // dispatch({
    //   type: 'REMOVE_ANSWER',
    //   questionId: questionId,
    //   wasCorrect: false
    // });
    // dispatch({ type: 'ENABLE_SUBMIT' });
    api
      .post('/answer', {
        question_id: questionId,
        answer: answer
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.correctAnswer) {
            dispatch(getUserScore());
            dispatch({
              type: 'MESSAGE',
              messageType: 'SUBMIT_ANSWER_SUCCESS',
              message: response.data.message
            });
            dispatch({
              type: 'REMOVE_ANSWER',
              questionId: questionId,
              wasCorrect: response.data.correctAnswer
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'SUBMIT_ANSWER_SUCCESS',
              message: response.data.message
            });
            dispatch({
              type: 'REMOVE_ANSWER',
              questionId: questionId,
              wasCorrect: response.data.correctAnswer
            });
          }

          dispatch({ type: 'ENABLE_SUBMIT' });
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'SUBMIT_ANSWER_FAILURE',
            message: response
              ? response.data.message
              : 'Error occurred when submitting the form'
          });
          dispatch({ type: 'ENABLE_SUBMIT' });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'SUBMIT_ANSWER_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Error occurred when submitting the form',
          err: err
        });
        dispatch({ type: 'ENABLE_SUBMIT' });
      });
  };
}
export function updateLevel(currDayFlag) {
  return dispatch => {
    // dispatch({
    //   type: 'UPDATE_LEVEL_SUCCESS',
    //   payload: { updated: true, message: 'Level updated.' }
    // });
    // dispatch(getQuestions(currDayFlag));
    // dispatch({
    //   type: 'MESSAGE',
    //   messageType: 'UPDATE_LEVEL_SUCCESS',
    //   message: 'Level Updated Successfully'
    // });
    // dispatch(getQuestions(currDayFlag));
    api
      .put('/level', {
        prev_day_questions_flag: currDayFlag
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.updated) {
            dispatch({
              type: 'UPDATE_LEVEL_SUCCESS',
              payload: response.data
            });
            dispatch(getQuestions(currDayFlag));
            dispatch({
              type: 'MESSAGE',
              messageType: 'UPDATE_LEVEL_SUCCESS',
              message: 'Level Updated'
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'UPDATE_LEVEL_FAILURE',
              message: 'Error occurred when updating level'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'UPDATE_LEVEL_FAILURE',
            message: response
              ? response.data.message
              : 'Error occurred when updating level'
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'UPDATE_LEVEL_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Error occurred when updating level',
          err: err
        });
      });
  };
}

export function updateAnswer(questionId, answer) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_ANSWER',
      questionId: questionId,
      payload: answer
    });
  };
}

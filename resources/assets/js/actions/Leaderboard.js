import api from '../api';

export function getLeaderboard(page = 1) {
  return dispatch => {
    /*dispatch({
      type: 'GET_LEADERBOARD_SUCCESS',
      payload: {
        gotScores: true,
        data: {
          current_page: 1,
          data: [
            {
              user_id: 43,
              score: 14,
              username: 'Grayson Deckow DDS',
              email: 'michele93@example.net'
            },
            {
              user_id: 40,
              score: 13,
              username: 'Mrs. Aubrey Keebler',
              email: 'lmohr@example.org'
            },
            {
              user_id: 3,
              score: 12,
              username: 'Jimmy Borer',
              email: 'bmcclure@example.org'
            },
            {
              user_id: 50,
              score: 12,
              username: 'Mariana Hayes',
              email: 'scorkery@example.org'
            },
            {
              user_id: 29,
              score: 11,
              username: 'Boyd Witting',
              email: 'birdie.lebsack@example.com'
            },
            {
              user_id: 36,
              score: 10,
              username: 'Gonzalo Pouros IV',
              email: 'stoltenberg.wilfrid@example.net'
            },
            {
              user_id: 32,
              score: 9,
              username: 'Dr. Dario Wisozk I',
              email: 'pfannerstill.elyssa@example.net'
            },
            {
              user_id: 14,
              score: 9,
              username: 'Kallie Jones',
              email: 'smclaughlin@example.net'
            },
            {
              user_id: 33,
              score: 9,
              username: 'Ms. Sister Kertzmann',
              email: 'ebogan@example.com'
            },
            {
              user_id: 27,
              score: 9,
              username: 'Prof. Merlin Huels DVM',
              email: 'adolph.king@example.net'
            }
          ],
          first_page_url: 'http://127.0.0.1:8000/users/score?page=1',
          from: 1,
          last_page: 7,
          last_page_url: 'http://127.0.0.1:8000/users/score?page=7',
          next_page_url: 'http://127.0.0.1:8000/users/score?page=2',
          path: 'http://127.0.0.1:8000/users/score',
          per_page: 10,
          prev_page_url: null,
          to: 10,
          total: 61
        },
        loggedInUserScore: {
          user_id: 61,
          user_rank: 52,
          score: 0,
          username: 'Placeholder Name',
          email: 'asdflaskdjf@asdfadf.asdfasdf'
        }
      }
    });*/
    api
      .get('/users/score', {
        params: {
          page: page
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.gotScores) {
            dispatch({
              type: 'GET_LEADERBOARD_SUCCESS',
              payload: response.data
            });
          } else {
            dispatch({
              type: 'ERROR',
              messageType: 'GET_LEADERBOARD_FAILURE',
              message: 'No scores available'
            });
          }
        } else {
          dispatch({
            type: 'ERROR',
            messageType: 'GET_LEADERBOARD_FAILURE',
            message: response.data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          messageType: 'GET_LEADERBOARD_FAILURE',
          message: err.response
            ? err.response.data.message
            : 'Unable fetch Leaderboard',
          err: err
        });
      });
  };
}

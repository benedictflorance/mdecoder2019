export default function reducer(
  state = {
    leaderboard: null
  },
  action
) {
  switch (action.type) {
    case 'GET_LEADERBOARD_SUCCESS': {
      return { ...state, leaderboard: action.payload };
    }
    default:
      return state;
  }
}

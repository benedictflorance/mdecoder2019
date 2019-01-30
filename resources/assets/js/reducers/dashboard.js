export default function reducer(
  state = {
    difficulty: null,
    selectedQuestion: null,
    user: null,
    remainingTime: null,
    startTime: null,
    disableSubmit: false,
    isContestLive: false
  },
  action
) {
  switch (action.type) {
    case 'UPDATE_SELECTED_QUESTION': {
      return {
        ...state,
        selectedQuestion: action.payload
      };
    }
    case 'UPDATE_SCORE_SUCCESS': {
      return {
        ...state,
        user: action.payload
      };
    }
    case 'UPDATE_DIFFICULTY': {
      return {
        ...state,
        difficulty: action.payload
      };
    }
    case 'DISABLE_SUBMIT': {
      return {
        ...state,
        disableSubmit: true
      };
    }
    case 'ENABLE_SUBMIT': {
      return {
        ...state,
        disableSubmit: false
      };
    }
    case 'UPDATE_REMAINING_TIME': {
      return {
        ...state,
        remainingTime: action.remainingTime,
        startTime: new Date().getTime(),
        isContestLive: action.isContestLive
      };
    }
    case 'FLUSH_DASHBOARD_STATE': {
      return {
        difficulty: null,
        selectedQuestion: null,
        user: null,
        remainingTime: null,
        startTime: null,
        disableSubmit: false,
        isContestLive: false
      };
    }
    default:
      return state;
  }
}

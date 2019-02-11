export default function reducer(
  state = {
    isAuthenticated: false,
    currDayFlag: 2
  },
  action
) {
  switch (action.type) {
    case 'AUTHORIZE_USER': {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case 'UNAUTHORIZE_USER': {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case 'SET_CURR_DAY_FLAG': {
      console.log(action.payload);
      return {
        ...state,
        currDayFlag: action.payload
      };
    }
    case 'REMOVE_CURR_DAY_FLAG': {
      return {
        ...state,
        currDayFlag: 2
      };
    }
    case 'FLUSH_USER_ACTION_STATE': {
      return {
        ...state,
        currDayFlag: 2
      };
    }
    default:
      return state;
  }
}

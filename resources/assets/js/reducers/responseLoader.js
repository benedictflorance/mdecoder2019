export default function reducer(
  state = {
    isLoading: false
  },
  action
) {
  switch (action.type) {
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
}

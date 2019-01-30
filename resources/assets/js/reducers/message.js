export default function reducer(
  state = {
    messageType: null,
    message: null,
    isErr: false,
    messageId: 0
  },
  action
) {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        messageType: action.messageType,
        message: action.message,
        isErr: true,
        messageId: Math.floor(Math.random() * 100000)
      };
    }
    case 'MESSAGE': {
      return {
        ...state,
        messageType: action.messageType,
        message: action.message,
        isErr: false,
        messageId: Math.floor(Math.random() * 100000)
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        messageType: null,
        message: null,
        isErr: false,
        messageId: Math.floor(Math.random() * 100000)
      };
    }
    default:
      return state;
  }
}

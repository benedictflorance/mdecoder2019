export default function reducer(
  state = {
    questions: []
  },
  action
) {
  switch (action.type) {
    case 'GET_QUESTIONS_SUCCESS': {
      var questions = action.payload;
      for (let question of questions) {
        question.answer = '';
      }
      return { ...state, loading: false, questions: questions };
    }
    case 'UPDATE_ANSWER': {
      return {
        ...state,
        questions: state.questions.map((item, index) => {
          if (item.id !== action.questionId) {
            return item;
          }
          return {
            ...item,
            answer: action.payload
          };
        })
      };
    }
    case 'REMOVE_ANSWER': {
      return {
        ...state,
        questions: state.questions.map((item, index) => {
          if (item.id !== action.questionId) {
            return item;
          }
          return {
            ...item,
            number_solved: action.wasCorrect
              ? item.number_solved + 1
              : item.number_solved,
            remaining_attempts: item.remaining_attempts - 1,
            user_solved: action.wasCorrect ? true : false,
            answer: action.wasCorrect ? '' : item.answer
          };
        })
      };
    }
    case 'FLUSH_QUESTIONS_STATE': {
      return {
        loading: false,
        questions: [],
        error: null,
        message: null
      };
    }
    default:
      return state;
  }
}

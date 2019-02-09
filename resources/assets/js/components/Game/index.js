import React from 'react';
import { connect } from 'react-redux';
import { showErrorMessage } from '../../actions/User';
import { updateSelectedQuestion } from '../../actions/Dashboard';
import { submitAnswer, updateAnswer } from '../../actions/Question';
import QuestionBox from './QuestionBox';
import AnswerBox from './AnswerBox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Game extends React.Component{
	constructor(props)
	{
	 super(props);
	 this.handleClickOnNext = this.handleClickOnNext.bind(this);
	 this.handleSubmit = this.handleSubmit.bind(this);
	}
    
    handleClickOnNext(event) {
    const { questions, selectedQuestion, updateSelectedQuestion } = this.props;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === selectedQuestion) {
        let newQuestion = questions[(i + 1) % questions.length];
        updateSelectedQuestion(newQuestion.id);
        }
     }
   }
   handleSubmit() {
    const { questions, selectedQuestion, submitAnswer } = this.props;
    const currQuestion = this.getQuestion(questions, selectedQuestion);
    if (currQuestion.answer === '') {
      this.props.showErrorMessage('Fill in answer before submitting');
      return;
     } else if (
      !currQuestion.user_solved &&
      currQuestion.remaining_attempts > 0
     ) {
      submitAnswer(currQuestion.id, currQuestion.answer);
     } else {
       this.props.showErrorMessage('Fill in answer before submitting');
     }
   }
  getQuestion(questions, selectedQuestion) {
    for (let question of questions) {
      if (question.id === selectedQuestion) {
        return question;
       }
     }
   }

   render()
   {
   	console.log("dcdcdcdcdc");
   	const { questions, selectedQuestion, updateAnswer, disableSubmit } = this.props;
   	let question;
    //uncomment the next set of lines during final integration
   	 // if(!question)
   	 // 	return null;

   	 // if(!selectedQuestion)
   	 // 	return null;

   	 question = this.getQuestion(questions,selectedQuestion);
     //add data to be question as prop for next line
   	 const questionBox = <QuestionBox  />;

   	 return(
   
     <Grid container style={{ height: '100vh'}}>
        <Grid item xs={12}>
          <Grid container><Grid item xs={12}>{questionBox}</Grid></Grid>
          // add question to be question and updateAnswer to be updateAnswer as prop
          <Grid container style={{textAlign:"center"}}><Grid item xs={12}><AnswerBox/></Grid></Grid>
          <Grid container>
            <Grid item xs={6}>
              <br />
              <Button size="large" style={{width:"100%",fontFamily:"Audiowide"}} variant="contained" color="primary" disabled={disableSubmit} onClick={() => {this.handleSubmit();}}>Submit</Button>
            </Grid>
            <Grid item xs={6}>
             <br />
             <Button onClick={this.handleClickOnNext} style={{width:"100%",fontFamily:"Audiowide"}} size="large" variant="contained" color="secondary">Next Question</Button>
            </Grid>
          </Grid>
        </Grid>
     </Grid>
    
   	 	);
   }

}

const mapStateToProps = state => {
  const {
    selectedQuestion,
    disableSubmit,
  } = state.dashboard;
  const { questions } = state.questions;
  const { currDayFlag } = state.user;
  return {
    selectedQuestion,
    questions,
    disableSubmit,
    currDayFlag
  };
};
const finalgame = connect(mapStateToProps, {
  updateSelectedQuestion,
  submitAnswer,
  updateAnswer,
  showErrorMessage,
})(Game);
export default finalgame;
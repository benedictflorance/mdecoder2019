import React from 'react';
import { connect } from 'react-redux';
import { showErrorMessage } from '../../actions/User';
import { updateSelectedQuestion } from '../../actions/Dashboard';
import { submitAnswer, updateAnswer } from '../../actions/Question';
import QuestionBox from './QuestionBox';
import AnswerBox from './AnswerBox';
import AttemptBox from './AttemptBox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';

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
   	const { questions,difficulty, selectedQuestion, updateAnswer, disableSubmit } = this.props;
   	const classes = this.props;
    let question;
    //uncomment the next set of lines during final integration
   	 if(!questions)
   	 	return null;

   	 if(!selectedQuestion)
   	 	return null;
     toast.success("Default Notification !");

   	 question = this.getQuestion(questions,selectedQuestion);
     //add data to be question as prop for next line
   	 const questionBox = <QuestionBox  data={question}/>;
     const attemptBox = <AttemptBox data={question} difficulty={difficulty}/>
     console.log(difficulty);
   	 return(
   
     <Grid container style={{height:"100vh"}} style={{
                marginBottom: '70px'
            }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} style={{marginTop: 1}}>{attemptBox }</Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>{questionBox }</Grid>
          </Grid>
          <Grid container style={{marginTop:"2px",textAlign:"center"}}><Grid item xs={12}><AnswerBox  question={question} updateAnswer={updateAnswer}/></Grid></Grid>
          <Grid container>
            <Grid item xs={6}>
              <br />
              <Button size="large" style={{width:"100%",fontFamily:"Audiowide"}} variant="contained" color="primary" 
              disabled={
                  disableSubmit
                } onClick={() => {this.handleSubmit();}}>Submit Answer</Button>
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
    difficulty
  } = state.dashboard;
  const { questions } = state.questions;
  const { currDayFlag } = state.user;
  return {
    difficulty,
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
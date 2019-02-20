import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    minWidth: 275,
    minHeight:400
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
  	textAlign:"center",
  	padding:10,
    fontFamily:"Audiowide"
  },
  content:
  {
  	backgroundColor:"#EEEEEE"
  },
  attempt: {
    color : "blue",
    fontSize: 17,
    fontFamily:"Audiowide",
    textAlign: "center"
  }
};

class AnswerBox extends React.Component{

     constructor()
     {
     	super();
     	this.handlechange=this.handlechange.bind(this);
     	this.state={
     		answer:""
     	}
     }

     handlechange(e)
     {
     	console.log(e.target.value);
     	this.setState({answer:e.target.value});
      this.props.updateAnswer(this.props.question.id,e.target.value);
     }

	render()
	{
		const {classes} = this.props;
    console.log("hola");
    const level = this.props.difficulty;
    const data = this.props.data;
    const currentDay = data.day;
    // console.log(question);
    const attempt = data.remaining_attempts;
    console.log(attempt);
    // const maxAttempt = question.max_number_of_tries;

		return (
             <Card>
              <CardContent className={classes.content}>
                <div className={classes.attempt}>
                  Attempts Remaining: {attempt}
                  Level : {level}
                  Day : {currentDay}
                </div>
              </CardContent>
             </Card>
			);
	}
}


AnswerBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerBox);


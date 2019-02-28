import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class QuestionToggle extends React.Component{

	showPopOver(maxAttempts,remAttempts,solved)
	{
		return "Solved: "+solved+", Max Attempts: "+maxAttempts+", Remaining Attempts: "+remAttempts;
	}

    render()
    {
    	 const {
      questions,
      selectedQuestion,
      updateSelectedQuestion
       } = this.props.data;
       const { classes } = this.props;
        const mappedQuestions = questions.map((question,i,arr) => (
          
          <Tooltip title={this.showPopOver(question.max_number_of_tries,
          question.remaining_attempts,
          question.number_solved)} key={question.id}>
            <ListItem key={question.id} button onClick={event => {updateSelectedQuestion(question.id)}} style={
            question.id === selectedQuestion
              ? {
                  backgroundColor: '#1E9EB6',
                 fontFamily:"Audiowide"
                }
               : question.user_solved
               ?
               {
                 backgroundColor:"#00E676"
                 fontFamily:"Audiowide"
               }
                :question.remaining_attempts == 0
               ? { 
               	  backgroundColor:"#FA6844",
                  fontFamily:"Audiowide"
               }
                :
                 {
                 	fontFamily:"Audiowide"
                 }
               }
               
                >
             <QuestionIcon />
             <ListItemText disableTypography primary={<Typography style={{fontFamily:"Audiowide"}}>Q:{i+1} </Typography>}  />
             <span style={{float: 'right' }}>
            {question.max_number_of_tries - question.remaining_attempts}/{
              question.max_number_of_tries
            }
          </span>
            </ListItem>

          </Tooltip>
        ));

        return (
          <div className={classes.root}>
           <List>{mappedQuestions}</List>
          </div>
        );
    }

}
QuestionToggle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionToggle);
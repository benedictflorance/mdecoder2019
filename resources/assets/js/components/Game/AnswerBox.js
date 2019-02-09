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
  textfield:
  {
  	backgroundColor:"white",
  	borderRadius:5,
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
    //const question = this.props.question;
		return (
             <Card>
              <CardContent className={classes.content}>
               <Typography variant="h5" className={classes.heading}>
                Your Answer
               </Typography>
               <form onSubmit={ e => {
                e.prevenyDefault();
                return false;
               }}>
                <FormGroup>
                  <TextField type="text" label="Enter Answer"  onChange={this.handlechange} className={classes.textfield} />
                </FormGroup>
               </form>
               </CardContent>
             </Card>
			);
	}
}


AnswerBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerBox);


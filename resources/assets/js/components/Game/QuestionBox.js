import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    Width: "100vw",
    minHeight:450
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
  	textAlign:"center",
    fontFamily:"Audiowide",
    color:"blue"
  },
  content:
  {
  	overflowY:"scroll"
  }
};

class QuestionBox extends React.Component {
	
	constructor()
	{
	super();
    }
	render()
	{
	const { classes } = this.props;
  const question = this.props.data;
     return(
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" className={classes.heading}>
            <u>Question</u>
          </Typography>
          <div> 
            {question.description}
          </div>
        </CardContent>
      </Card>
      );

	}
}

QuestionBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionBox);


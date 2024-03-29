import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation	from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = {
  root: {
    width: "100%",
    backgroundColor : "#EEEEEE",
    fontFamily:"Audiowide",
    position:"fixed",
    bottom:"0px"
  },
 
};

const styleBottom = {
	 left :{
     backgroundColor: "#FF3F33" ,
     marginRight:"5%",
     fontWeight:"bold",
     
  },
  right:{
  	backgroundColor:"#335EFF",
  	marginLeft:"5%",
  	 fontWeight:"bold",
  }
}

class bottomNavigation extends React.Component {
	state = {
		value : 0
	};
	handleChange = (event,value) => {
		this.setState({value});
	};

	render() {
     
     const { classes } = this.props;
     const { value } = this.props;

     return (
         <BottomNavigation
          value = {value}
          onChange = {this.handleChange}
          showLabels
          className = {classes.root}
         >
           <BottomNavigationAction label = "Yesterday's Questions" style = {styleBottom.left} icon= {<QuestionIcon/>} onClick={()=>{this.props.getQuestions(1)}}/>
           <BottomNavigationAction label = "Today's Questions"  style = {styleBottom.right} icon={<QuestionIcon/>} onClick={() =>{this.props.getQuestions(0);}} />
         </BottomNavigation>
     	);
	}
}

bottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(bottomNavigation);
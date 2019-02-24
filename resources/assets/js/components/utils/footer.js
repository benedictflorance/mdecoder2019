import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = {
  root: {
    width: "100%",
    backgroundColor : "#335EFF",
    fontFamily:'monospace',
    position:"fixed",
    bottom:"0px",
    height:"50px",
    fontWeight:"bold",
    fontSize:"15px",
  },
  link: {
    color: "#ffffff",
    fontWeight:"bold",
  }
 
};
class bottomNavigation extends React.Component {
  render() {
     
     const { classes } = this.props;
     const { value } = this.props;
     const { currDayFlag } = this.props;
     return (
         <div className = {classes.root}>
          <p style={{color: "#ffffff", textAlign:"center"}}> Made with <span style={{color: "red"}}>♥</span> by <a target="_blank" href='#' className={classes.link}>Spider</a> and <a target="_blank" className={classes.link} href='#'>Maximus</a> </p>
         </div>
      );
  }
}

bottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(bottomNavigation);
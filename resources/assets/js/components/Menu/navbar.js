import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/User';
import Grid from '@material-ui/core/Grid';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontFamily:"Audiowide",
    padding: 7,
  },
};

class Navbar extends React.Component {
  constructor()
  {
    super();
  }
  state={
    left:false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
   //we have to hide the 2 typography lines below when displaying the navbar in dashboard,leaderboard and login page but display them in main game
   render(){
  const { classes } = this.props;
  const { isAuthenticated } = this.props;
  const { user } = this.props;
  const userName = isAuthenticated && user? (
       <React.Fragment>
         <Typography variant="h6" color="inherit" className={classes.grow}>
            User: {user.username}
         </Typography>
       </React.Fragment>
    ) : null;
    const userScore = isAuthenticated && user? (
       <React.Fragment>
           <Typography variant="h6" color="inherit" className={classes.grow}>
              Score: {user.score}
              </Typography>
          </React.Fragment>
    ) : null;
  const sideList= isAuthenticated ? (
    <div>
    <img src="https://youthincmag.com/wp-content/uploads/2018/02/Pragyan-logo-.jpg" width="150" height="150" />
    <Divider />
    <List>
    <ListItem button onClick={() => {this.props.history.push("/")}}>
    <ListItemText primary={'DASHBOARD'} />
    </ListItem>
    <ListItem button onClick={() => {this.props.history.push("/leaderboard")}}>
    <ListItemText primary={'LEADERBOARD'} />
    </ListItem>
    <ListItem button onClick={() => {this.props.logoutUser()}}>
    <ListItemText primary={'LOGOUT'} />
    </ListItem>
    </List>
    </div>
    ) : (
    <div>
    <img src="https://youthincmag.com/wp-content/uploads/2018/02/Pragyan-logo-.jpg" width="150" height="150" />
    <Divider />
    <List>
    <ListItem button onClick={() => {this.props.history.push("/leaderboard")}}>
    <ListItemText primary={'LEADERBOARD'} />
    </ListItem>
    <ListItem button onClick={() => {this.props.history.push("/instructions")}}>
    <ListItemText primary={'INSTRUCTIONS'} />
    </ListItem>
    <ListItem button onClick={() => {this.props.history.push("/userlogin")}}>
    <ListItemText primary={'LOGIN'}  />
    </ListItem>
    </List>
    </div>
    );
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Grid container style={{padding: "10px"}}>
          <Grid item xs={1} >
            <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleDrawer('left',true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              MDECODER
            </Typography>
          </Grid>
         <Grid item xs={6} sm={4}> 
          {userName}
         </Grid>
         <Grid item xs={5} sm={3}> 
          {userScore}
         </Grid>
         </Grid>
        </Toolbar>
      </AppBar>
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left',false)}>
        <div
            tabIndex={1}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          />
          {sideList}
      </Drawer>
    </div>
  );
}
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  const { user } = state.dashboard;
  return {
    isAuthenticated,
    user
  };
};

const StyleNavbar = withStyles(styles)(Navbar)
const Statenavbar = connect(mapStateToProps,{logoutUser})(StyleNavbar)
export default withRouter(Statenavbar);
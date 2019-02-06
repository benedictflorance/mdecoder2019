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
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
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

  const sideList= (
    <div>
    <img src="https://youthincmag.com/wp-content/uploads/2018/02/Pragyan-logo-.jpg" width="150" height="150" />
    <Divider />
    <List>
    <ListItem button onClick={this.toggleDrawer('left', false)}>
    <ListItemText primary={'DASHBOARD'} />
    </ListItem>
    <ListItem button onClick={this.toggleDrawer('left', false)}>
    <ListItemText primary={'LEADERBOARD'} />
    </ListItem>
    <ListItem button onClick={this.toggleDrawer('left', false)}>
    <ListItemText primary={'LOGOUT'} />
    </ListItem>
    </List>
    </div>
    )
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleDrawer('left',true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          MDECODER2019
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          User:
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          Score:
          </Typography>
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

export default withStyles(styles)(Navbar);
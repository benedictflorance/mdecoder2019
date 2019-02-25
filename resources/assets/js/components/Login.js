import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import Navbar from './Menu/navbar';
import Grid from '@material-ui/core/Grid';

import { showErrorMessage, loginUser } from '../actions/User';
import { getContestRemainingTime } from '../actions/Dashboard';
import Timer from './utils/timerUtil';
import Footer from './utils/footer';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: green[500],
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
      fontFamily:"Audiowide",
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    inputLabel: {
      fontFamily:"Audiowide",
    },
    footer:{
      marginBottom : '0px',
    },
  });
  
  class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        emailid : '',
        password: ''
      };
    }
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    handleSubmit = (event) => {
      event.preventDefault();
      let emailId = this.state.emailid;
      let password = this.state.password;
      if (emailId === '' || password === ''){
        this.props.showErrorMessage('Fill the missing details');
      } 
      else if (!this.validateEmail(emailId)) {
          this.props.showErrorMessage('Invalid emailId entered');
      }
      else {
        this.props.loginUser(emailId, password);
      }
    }

    handleEmailIdChange = (event) => {
      this.setState({emailid : event.target.value});
    }
    handlePasswordChange = (event) => {
      this.setState({password : event.target.value});
    }
    componentWillMount()
    {
      this.props.getContestRemainingTime();
    }

    render(){
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { classes } = this.props;
      if (this.props.isAuthenticated) {
        return <Redirect to={from} />;
      }
      const { remainingTime, startTime, isContestLive } = this.props;
       const live = <p style={{fontFamily:"Audiowide",fontSize: '1.5em',color:"White"}}>Contest is LIVE</p>;
      const timer =  (<React.Fragment>
            <Timer
              getContestRemainingTime={getContestRemainingTime}
              displayText={'Contest starts in'}
              remainingTime={remainingTime}
              startTime={startTime}
            />
            <p style={{color:"white",fontSize:"1.2em",fontFamily:"Audiowide"}}>You can solve current day's questions if you had started solving it
          within the time frame and you still have time left.
            </p>
            </React.Fragment>
          );

      const display = isContestLive ? live : remainingTime ? timer : null;
         
      return (
        <React.Fragment>
         <Grid container>
           <Navbar />
         </Grid>
         <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{marginTop:'10px',textAlign:"center"}}
          >
         {display}
         </Grid> 
         <Grid container>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              +
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel className={classes.inputLabel} htmlFor="email">Webmail</InputLabel>
                <Input onChange={this.handleEmailIdChange} value={this.state.emailid} id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel className={classes.inputLabel} htmlFor="password">Webmail Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePasswordChange} value={this.state.password} />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
        </Grid>
        <Footer/>
        </React.Fragment>
    );
    }
  
  }
  
  const mapStateToProps = state => {
    const { isAuthenticated } = state.user;
    const { remainingTime, startTime, isContestLive } = state.dashboard;
    return {
      isAuthenticated,
      remainingTime,
      startTime,
      isContestLive
    };
  };

  export default connect(mapStateToProps, {
    loginUser,
    showErrorMessage,
    getContestRemainingTime
  })(withStyles(styles)(Login));
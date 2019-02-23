import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimerUtil from '../utils/timerUtil';
import { getContestRemainingTime, getUserRemainingTime } from '../../actions/Dashboard';
import { showErrorMessage, toggleDay } from '../../actions/User';


const styles = {
  root: {
    width: "100%",
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };
  constructor(props) {
    super(props);
    this.refreshTimer = this.refreshTimer.bind(this);
  }
  componentDidMount() {
    clearInterval(this.interval);
    this.interval = setInterval(this.refreshTimer, 180000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  refreshTimer() {
    const {
      getUserRemainingTime,
      getContestRemainingTime,
      currDayFlag
    } = this.props;
    if (currDayFlag == 0) getUserRemainingTime();
    else getContestRemainingTime();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { remainingTime, startTime, isContestLive } = this.props;
    return (
     
        <div className={classes.root}>
           <TimerUtil mb={3}
              toggleDay={toggleDay}
              remainingTime={remainingTime}
              startTime={startTime}
            />
        </div>
     
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { remainingTime, startTime, isContestLive } = state.dashboard;
  return {
    remainingTime,
    startTime,
    isContestLive
  };
}

export default connect(mapStateToProps, {getContestRemainingTime})(withStyles(styles)(SimpleBottomNavigation));
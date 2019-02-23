import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles ={
  timer : {
    color : "white",
    textAlign: 'center',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    fontSize: 12,
    fontFamily:"Audiowide"
  },
}

class Timer extends React.Component {
  getElapsedTime(remainingTime, startTime) {
    const time = remainingTime - (new Date().getTime() - startTime) / 1000;
    if (time > 0) return time;
    if (this.props.toggleDay) this.props.toggleDay();
    else this.props.getContestRemainingTime();
  }
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.interval = setInterval(this.forceUpdate.bind(this), 1000);
  }
  render() {
    const {classes} = this.props;
    const { remainingTime, startTime } = this.props;
    const elapsed = this.getElapsedTime(remainingTime, startTime);
    const time = this.secondsToTime(elapsed);
    const displayText = this.props.displayText
      ? this.props.displayText
      : 'Time';
    return (
      <div className={classes.timer}>
        <h1>
          {displayText} : {time.h} : {time.m} : {time.s}
        </h1>
      </div>
    );
  }
}
Timer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);

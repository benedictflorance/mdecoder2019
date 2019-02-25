import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/Question';
import Navbar from './Menu/navbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GameComponent from './GameComponent';
import Instructions from './Instructions';
class Dashboard extends React.Component {
	render()
	{
		const { isAuthenticated, currDayFlag , getQuestions } = this.props;
		if(isAuthenticated && currDayFlag < 2)
		{
			return <GameComponent />
		}
		if(isAuthenticated)
		 {return (
              <React.Fragment>
                 <Navbar />
                 <br />
                 <Instructions />
                 <Grid container style={{textAlign:"center",padding:"20px"}}>
                   <Grid item xs={6}>
                     <Button size="large" variant="contained"  style={{fontFamily:"Audiowide",fontSize:"1.3em" ,width:"100%",borderRadius:"25px",padding:"15px",backgroundColor:"#28398d",color:"white"}} onClick={() => {getQuestions(1)}} >Yesterday's Questions</Button>
                   </Grid>
                   <Grid item xs={6}>
                     <Button size="large" variant="contained"  style={{fontFamily:"Audiowide",fontSize:"1.3em" ,width:"100%",borderRadius:"25px",padding:"15px",backgroundColor:"#28398d",color:"white"}} onClick={() => {getQuestions(0)}} >Today's Questions</Button>
                   </Grid>
                 </Grid>
              </React.Fragment>
			);
         }
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated:state.user.isAuthenticated,
		currDayFlag:state.user.currDayFlag
	};
};

export default connect(mapStateToProps,{getQuestions})(Dashboard);

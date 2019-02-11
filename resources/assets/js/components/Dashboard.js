import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/Question';
import Navbar from './Menu/navbar';
import BottomNavigation from './Menu/bottomNavigationDashboard';
import GameComponent from './GameComponent';
import Instructions from './Instructions';
class Dashboard extends React.Component {
	render()
	{
		const { isAuthenticated, currDayFlag, getQuestions } = this.props;
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
                 <BottomNavigation getQuestions = {getQuestions} />
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

import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { updateSelectedQuestion } from '../../actions/Dashboard';
import Navbar from './navbar';
import QuestionTab from './QuestionTab';
import Timer from './Timer';
import BottomNavigation from './bottomNavigation';

class Menu extends React.Component{
	constructor(props)
	{
		super(props);
	}

    render()
    {
    	const { difficulty ,questions,selectedQuestion,updateSelectedQuestion,currDayFlag } = this.props;
    	return( 
         <Grid container>
           <Grid item xs={12}>
              <Navbar />
              <Timer />
              <QuestionTab />
           </Grid>
         </Grid>
    		);
    }
};

const mapStateToProps = state => {
	const { difficulty , selectedQuestion } = state.dashboard;
	const { questions } = state.questions;
	const { currDayFlag } = state.user;
	  return {
    difficulty,
    questions,
    selectedQuestion,
    currDayFlag
   };
}

export default connect(mapStateToProps,{updateSelectedQuestion})(Menu);
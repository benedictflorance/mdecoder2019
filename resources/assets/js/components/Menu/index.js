import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { updateSelectedQuestion } from '../../actions/Dashboard';
import QuestionTab from './QuestionTab';
import QuestionToggle from './QuestionToggle';
import Timer from './Timer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateLevel } from '../../actions/Question';
import { toggleDay } from '../../actions/User';

class Menu extends React.Component{
	constructor(props)
    {
    	super(props);
        this.state = {
            showModal: false,
            modalMsg: '',
            modalAction: ''
        };
        this.showConfirmModal = this.showConfirmModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleModalAction = this.handleModalAction.bind(this);
    }

    showConfirmModal(modalMsg, modalAction) {
      this.setState({
        showModal: true,
        modalMsg: modalMsg,
        modalAction: modalAction
       });
    }
    handleCloseModal() {
       this.setState({
        showModal: false,
        modalMsg: '',
        modalAction: ''
      });
    }
    handleModalAction() {
    if (this.state.modalAction === 'toggleDay') {this.props.toggleDay(); }
    else if (this.state.modalAction === 'updateLevel')
      this.props.updateLevel(this.props.currDayFlag); 
      this.setState({
       showModal: false,
       modalMsg: '',
       modalAction: ''
     });
   }

    render()
    {
    	const { difficulty ,questions,selectedQuestion,updateSelectedQuestion,currDayFlag } = this.props;

    	return( 
    	<div>	
    	<Dialog
			    open = {this.state.showModal}
			    onClose= {this.handleCloseModal}
			    aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
               <DialogTitle style={{textAlign:"center",fontFamily:"Audiowide"}}>Confirm Action</DialogTitle>
                <DialogContentText style={{padding:"10px"}}>
                  <strong>{this.state.modalMsg}</strong>
                </DialogContentText>
                <DialogActions>
                  <Button onClick={this.handleModalAction} color="primary" size="large" autoFocus>Yes</Button>
                  <Button onClick={this.handleCloseModal} color="primary" size="large">No</Button>
                </DialogActions>
              </Dialog> 
         <Grid container>
           <Grid item xs={12} style={{padding:"10px"}}>
               <Timer />
               <Button size="large" variant="contained"  style={{fontFamily:"Audiowide",width:"100%",padding:"20px",marginTop:"15px",marginBottom:"15px",backgroundColor:"#1E9EB6",color:"white"}} onClick={() => {this.showConfirmModal('Do you want to toggle Day? Anyway you can come back to the day you are solving now :)','toggleDay');}} >{currDayFlag === 1 ? "Today's Questions" : "Yesterday's Questions"}</Button>
               <br />
               <Button size="large" variant="contained"  style={{fontFamily:"Audiowide",width:"100%",padding:"20px",marginTop:"15px",marginBottom:"30px",backgroundColor:"#1E9EB6",color:"white"}} onClick={() => {this.showConfirmModal('Are you sure you want to go to next easier level? Note: Once you do that you cannot revert back to this level again!!','updateLevel');}} > Next Section </Button>
               <br />
              <QuestionToggle data = {{questions,selectedQuestion,updateSelectedQuestion}}/>
           </Grid>
         </Grid>
         </div>
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

export default connect(mapStateToProps,{updateSelectedQuestion , updateLevel ,toggleDay})(Menu);
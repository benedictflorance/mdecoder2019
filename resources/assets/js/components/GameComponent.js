import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Game from './Game/index';
import Menu from './Menu/index';
import BottomNavigation from './Menu/bottomNavigation';
import '../css/navigation.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateLevel } from '../actions/Question';
import { toggleDay } from '../actions/User';
class GameComponent extends React.Component{
    
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
      this.setState({
       showModal: false,
       modalMsg: '',
       modalAction: ''
     });
    if (this.state.modalAction === 'toggleDay') {this.props.toggleDay(); console.log("toggling day"); }
    else if (this.state.modalAction === 'updateLevel')
      this.props.updateLevel(this.props.currDayFlag); 
   }

	render()
	{
		return (
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
                  <Button onClick={this.handleModalAction} color="primary" size="large">No</Button>
                </DialogActions>
              </Dialog>  
			  <Menu />
              <Game />
              <BottomNavigation showConfirmModal = {this.showConfirmModal} />
              </div>
			);
	}
}

const mapStateToProps = state => {
	const { currDayFlag } = state.user;
	return {
		currDayFlag
	}
}

export default connect(mapStateToProps,{ updateLevel , toggleDay })(GameComponent);
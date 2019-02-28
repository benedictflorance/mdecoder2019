import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import App from '../App';

class MessageContainer extends React.Component {
  render() {
    const { message, isErr } = this.props.message;
    const { isLoading } = this.props;
    if (message) {
      const toastMessage = (
        <div style={{ textAlign: 'center', color: "white" }}> {message} </div>
      );
      const toastOptions = {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: true
      };
      if (isErr) {
        toast.error(toastMessage, toastOptions);
      } else {
        toast.success(toastMessage, toastOptions);
      }
    }
    const toastLoadingOptions = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false
      };
    
    if(isLoading) { toast.info("Loading ...", toastLoadingOptions) }
    else {toast.dismiss();}
    return <App />;
  }
}

const mapStateToProps = state => {
  const { message } = state;
  const { isLoading } = state.loading;
  return { message , isLoading };
};

export default connect(mapStateToProps)(MessageContainer);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import MessageContainer from './components/utils/MessageContainer';
import store from "./store";
import "./css/index.css"

ReactDOM.render(
   <Provider store={store}>
     <CookiesProvider>
       <ToastContainer />
       <MessageContainer />
     </CookiesProvider>
   </Provider>,
   document.getElementById("App")
	);
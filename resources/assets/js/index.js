import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

import MessageContainer from './components/utils/MessageContainer';
import store from "./store";
import "./css/index.css"

import MainApp from "./components/App";

ReactDOM.render(
   <Provider store={store}>
     <CookiesProvider>
       <ToastContainer autoClose={8000}/>
       <MessageContainer />
     </CookiesProvider>
   </Provider>,
   document.getElementById("App")
	);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import store from "./store";
import "./css/index.css"

import MessageContainer from "./components/utils/MessageContainer";

ReactDOM.render(
   <Provider store={store}>
     <CookiesProvider>
       <ToastContainer />
       <MessageContainer />
     </CookiesProvider>
   </Provider>,
   document.getElementById("App")
	);
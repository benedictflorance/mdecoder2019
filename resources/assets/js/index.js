import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from "./store";


import MainApp from "./components/App";

ReactDOM.render(
   <Provider store={store}>
     <CookiesProvider>
       <MainApp />
     </CookiesProvider>
   </Provider>,
   document.getElementById("App")
	);

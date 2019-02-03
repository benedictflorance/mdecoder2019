import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk' ;
import promise from 'redux-promise-middleware';

import reducer from './reducers'

const middlewares = [
	promise(),
	thunkMiddleware,
	process.env.REACT_APP_API_URL === 'http://127.0.0.1:8000'
].filter(Boolean);
const middleware = applyMiddleware(...middlewares);
const store = createStore(reducer, middleware);

export default compose(middleware)(createStore)(reducer);

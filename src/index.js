import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(
		thunkMiddleware // lets us dispatch() functions
));

ReactDOM.render( <Provider store={store}>
	<App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();

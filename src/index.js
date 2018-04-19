import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import ScenePage from "./containers/ScenePage";
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
const middleware = routerMiddleware(history);


const store = createStore(rootReducer, applyMiddleware(
		thunkMiddleware, middleware
));

ReactDOM.render( <Provider store={store}>
	<ConnectedRouter history={history}>
		<div>
			<Route exact path="/" component={App}/>
			<Route path="/Scenes" component={ScenePage}/>
		</div>
	</ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();

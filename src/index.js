import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import { createStore, applyMiddleware } from 'redux'
import './index.css';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import ScenePage from "./containers/ScenePage";
import MainPage from "./containers/MainPage";
import ClimatePage from "./containers/ClimatePage";
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.min.css'
import 'react-bootstrap-slider/src/css/bootstrap-slider.min.css'

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(
		thunkMiddleware, middleware
));

ReactDOM.render( <Provider store={store}>
	<ConnectedRouter history={history}>
		<div>
			<Route exact path="/" component={MainPage}/>
			<Route path="/Scenes" component={ScenePage}/>
			<Route path="/Climate" component={ClimatePage}/>
		</div>
	</ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();


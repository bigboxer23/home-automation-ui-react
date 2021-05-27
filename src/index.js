import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'
import ScenePage from "./containers/ScenePage";
import MainPage from "./containers/MainPage";
import ClimatePage from "./containers/ClimatePage";
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import {Route} from 'react-router'
import { createBrowserHistory } from "history";
import createRootReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.min.css'
import './index.css';
import RoomPage from "./containers/RoomPage";
import GaragePage from "./containers/GaragePage";
import HousePage from "./containers/HousePage";
import FrontDoorSecurity from "./containers/FrontDoorSecurityPage";
import ErrorPage from "./containers/ErrorPage";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
	return createStore(
			createRootReducer(history), // root reducer with router state
			preloadedState,
			compose(
					applyMiddleware(
							thunkMiddleware,
							routerMiddleware(history) // for dispatching history actions
					),
			),
	);
}
ReactDOM.render( <Provider store={configureStore({})}>
	<ConnectedRouter history={history}>
		<Route exact path="/" component={MainPage}/>
		<Route path="/Scenes" component={ScenePage}/>
		<Route path="/House" component={HousePage}/>
		<Route path="/Climate" component={ClimatePage}/>
		<Route path="/Room/:name" component={RoomPage}/>
		<Route path="/Garage" component={GaragePage}/>
		<Route path="/Security" component={FrontDoorSecurity}/>
		<Route path="/error" component={ErrorPage}/>
	</ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
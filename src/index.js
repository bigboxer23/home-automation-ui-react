import React from "react";
import ReactDOM from "react-dom/client";
import "jquery";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import ScenePage from "./containers/ScenePage";
import MainPage from "./containers/MainPage";
import ClimatePage from "./containers/ClimatePage";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";

import "bootstrap/dist/css/bootstrap.css";
import "@mdi/font/css/materialdesignicons.min.css";
import "./index.css";
import RoomPage from "./containers/RoomPage";
import GaragePage from "./containers/GaragePage";
import HousePage from "./containers/HousePage";
import CameraPage from "./containers/CameraPage";
import ErrorPage from "./containers/ErrorPage";
import MeuralPage from "./containers/MeuralPage";
import MeuralPromptPage from "./containers/MeuralPromptPage";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
	return createStore(
		createRootReducer(history), // root reducer with router state
		preloadedState,
		compose(
			applyMiddleware(
				thunk,
				routerMiddleware(history), // for dispatching history actions
			),
		),
	);
}
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={configureStore({})}>
		<ConnectedRouter history={history}>
			<Route exact path="/" component={MainPage} />
			<Route path="/Scenes" component={ScenePage} />
			<Route path="/House" component={HousePage} />
			<Route path="/Climate" component={ClimatePage} />
			<Route path="/Room/:name" component={RoomPage} />
			<Route path="/Garage" component={GaragePage} />
			<Route path="/Security" component={CameraPage} />
			<Route path="/Grow" component={CameraPage} />
			<Route path="/Meural" exact={true} component={MeuralPage} />
			<Route path="/Meural/prompt" component={MeuralPromptPage} />
			<Route path="/error" component={ErrorPage} />
		</ConnectedRouter>
	</Provider>,
);

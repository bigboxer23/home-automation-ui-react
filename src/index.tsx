import React from "react";
import ReactDOM from "react-dom/client";
import "jquery";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import ScenePage from "./containers/ScenePage";
import MainPage from "./containers/MainPage";
import ClimatePage from "./containers/ClimatePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import rootReducer from "./reducers";
import NavigationProvider from "./components/NavigationProvider";

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

export default function configureStore(preloadedState: any = {}) {
	return createStore(
		rootReducer,
		preloadedState,
		compose(applyMiddleware(thunk)),
	);
}
ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={configureStore({})}>
		<BrowserRouter>
			<NavigationProvider>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/Scenes" element={<ScenePage />} />
					<Route path="/House" element={<HousePage />} />
					<Route path="/Climate" element={<ClimatePage />} />
					<Route path="/Room/:name" element={<RoomPage />} />
					<Route path="/Garage" element={<GaragePage />} />
					<Route path="/Security" element={<CameraPage />} />
					<Route path="/Grow" element={<CameraPage />} />
					<Route path="/Meural" element={<MeuralPage />} />
					<Route path="/Meural/prompt" element={<MeuralPromptPage />} />
					<Route path="/error" element={<ErrorPage />} />
				</Routes>
			</NavigationProvider>
		</BrowserRouter>
	</Provider>,
);

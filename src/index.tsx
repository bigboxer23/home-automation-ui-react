import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import ScenePage from "./containers/ScenePage";
import MainPage from "./containers/MainPage";
import ClimatePage from "./containers/ClimatePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import rootReducer from "./reducers";
import NavigationProvider from "./components/NavigationProvider";
import PageFooter from "./components/PageFooter";

import "@mdi/font/css/materialdesignicons.min.css";
import "./index.css";
import RoomPage from "./containers/RoomPage";
import GaragePage from "./containers/GaragePage";
import HousePage from "./containers/HousePage";
import CameraPage from "./containers/CameraPage";
import ErrorPage from "./containers/ErrorPage";
import MeuralPage from "./containers/MeuralPage";
import MeuralPromptPage from "./containers/MeuralPromptPage";

// No preloaded state: the only caller is the render below. Redux's own
// PreloadedState type resolves to `never` against this reducer, so a
// parameter here could not be typed without an `any` to nobody's benefit.
export default function configureStore() {
	return createStore(rootReducer, undefined, compose(applyMiddleware(thunk)));
}
ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={configureStore()}>
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
				<PageFooter />
			</NavigationProvider>
		</BrowserRouter>
	</Provider>,
);

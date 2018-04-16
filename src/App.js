import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.min.css'
import MainPage from './containers/MainPage'
import { connect } from 'react-redux'
import {fetchStatusIfNecessary} from "./actions/index"

class App extends Component {

	componentDidMount()
	{
		const { dispatch } = this.props;
		dispatch(fetchStatusIfNecessary());
	}

	render() {
		return (
				<div>
					<MainPage/>
				</div>
		);
	}
}

export default connect()(App);

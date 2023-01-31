import React from 'react';
import { connect } from 'react-redux'
import {push} from "connected-react-router";
import {bindActionCreators} from "redux";
import {fetchStatusIfNecessary, sceneClicked} from '../actions'
import MeuralPageComponent from "../components/meural/MeuralPageComponent";

class MeuralPage extends React.Component
{
	render()
	{
		return <MeuralPageComponent {...this.props}/>
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/')
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MeuralPage)

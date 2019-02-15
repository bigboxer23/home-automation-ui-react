import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import FrontDoorSecurityComponent from "../components/FrontDoorSecurityComponent";

class FrontDoorSecurityPage extends React.Component
{
	render()
	{
		return <FrontDoorSecurityComponent {...this.props}/>
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/')
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(FrontDoorSecurityPage)

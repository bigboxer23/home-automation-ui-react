import React from "react";
import { Button } from 'react-bootstrap'
import {sceneNavigation} from "../actions";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

const SceneButton = props => (
		<Button onClick={() => props.changePage()} bsStyle={"default"} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-clock"></i>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">Scenes</div>
		</Button>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: () => push('/Scenes')
}, dispatch);

export default connect(
		null,
		mapDispatchToProps
)(SceneButton)
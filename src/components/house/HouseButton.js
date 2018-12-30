import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {sceneClicked} from "../../actions";

const HouseButton = props => (
		<Button onClick={() => props.allOff()} bsStyle={"default"} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-clock"></i>
			<div className="temp-display pr-1 pl-1 position-absolute total-lights-bg" onClick={(event) => props.changePage(event)}>{props.room.totalLights}</div>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">All Off</div>
		</Button>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: (event) => (dispatch, getState) =>
	{
		event.stopPropagation();
		dispatch(push('/Scenes'));
	},
	allOff: (event) => sceneClicked("Morning", "OFF")
}, dispatch);

export default connect(
		null,
		mapDispatchToProps
)(HouseButton)
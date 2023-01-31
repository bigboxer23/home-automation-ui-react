import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import {setMeuralOn} from "../../actions";

const HouseButton = props => (
		<Button onClick={(event) => props.changePage(event, isOn(props.room.devices))} variant="" size="lg" className={"m-1 position-relative d-flex justify-content-center house-button"}>
			<i className={getButtonStyling(props.room.devices)}/>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Meural</div>
		</Button>
);

const getButtonStyling = (devices) =>
{
	return "mdi mdi-image-" + (isOn(devices) ? "frame" : "filter-frames");
};

const isOn = (devices) =>
{
	return "1.0" === devices.find(device => "Meural" === device.name)?.level;
};

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: (event, isOn) => (dispatch) =>
	{
		event.stopPropagation();
		if (!isOn)
		{
			dispatch(setMeuralOn(true));
		}
		dispatch(push('/Meural'));
	}
}, dispatch);

export default connect(
		null,
		mapDispatchToProps
)(HouseButton)
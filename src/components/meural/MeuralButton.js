import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import {setMeuralOn} from "../../actions";
import {findMeuralDeviceFromRoom, isOn} from "../../containers/MeuralPage";

const MeuralButton = props => (
		<Button onClick={(event) => props.changePage(event, isOn(findMeuralDeviceFromRoom(props.room)))} variant="" size="lg" className={"m-1 position-relative d-flex justify-content-center house-button"}>
			<i className={getButtonStyling(findMeuralDeviceFromRoom(props.room))}/>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Meural</div>
		</Button>
);

export const getButtonStyling = (device) =>
{
	return "mdi mdi-image-" + (isOn(device) ? "frame" : "filter-frames");
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
)(MeuralButton);
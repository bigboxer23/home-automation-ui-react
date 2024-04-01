import React from "react";
import IOSSwitch from "../ui/IOSSwitch";
import { bindActionCreators } from "redux";
import { setMeuralOn } from "../../actions";
import { isOn } from "../../containers/MeuralPage";
import { connect } from "react-redux";

const MeuralHeaderComponent = function (props) {
	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span
					className="mdi mdi-chevron-left mdi-36px z-index-1 "
					onClick={props.back}
				></span>
				{props.name}
				<div className={"flex-grow-1"} />
				<IOSSwitch
					className="me-4"
					checked={isOn(props.device)}
					onChange={() => props.toggleOnOff(props.device)}
				/>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleOnOff: (devices) => (dispatch) =>
				dispatch(setMeuralOn(!isOn(devices))),
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralHeaderComponent);

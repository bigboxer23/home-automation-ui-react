import React from "react";
import IOSSwitch from "../ui/IOSSwitch";
import { bindActionCreators } from "redux";
import { setMeuralOn } from "../../actions";
import { isOn } from "../../containers/MeuralPage";
import { connect } from "react-redux";

const MeuralHeaderComponent = ({ back, name, device, toggleOnOff }) => {
	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span className="d-flex align-items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
					{name}
				</span>
				<div className={"flex-grow-1"} />
				<IOSSwitch
					className="me-4"
					checked={isOn(device)}
					onChange={() => toggleOnOff(device)}
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

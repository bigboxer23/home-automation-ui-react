import React from "react";
import { Button } from "react-bootstrap";
import { getButtonStyling } from "./MeuralButton";
import { getOnOffText, isOn } from "../../containers/MeuralPage";
import { bindActionCreators } from "redux";
import { setMeuralOn } from "../../actions";
import { connect } from "react-redux";
import type { Device } from "../../types";

interface MeuralOnOffButtonProps {
	device: Device | undefined;
	toggleOnOff: (device: Device | undefined) => void;
}

const MeuralOnOffButton: React.FC<MeuralOnOffButtonProps> = (props) => (
	<div>
		<Button
			onClick={() => props.toggleOnOff(props.device)}
			variant=""
			size="lg"
			className={
				"m-1 position-relative d-flex justify-content-center house-button"
			}
		>
			<i className={getButtonStyling(props.device)} />
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
				{getOnOffText(props.device)}
			</div>
		</Button>
	</div>
);

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			toggleOnOff: (devices: Device | undefined) => (dispatch: any) =>
				dispatch(setMeuralOn(!isOn(devices))),
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralOnOffButton);

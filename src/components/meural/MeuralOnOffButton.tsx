import React from "react";
import AppButton from "../ui/AppButton";
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
		<AppButton
			onClick={() => props.toggleOnOff(props.device)}
			size="lg"
			className={"m-1 relative flex justify-center house-button"}
		>
			<i className={getButtonStyling(props.device)} />
			<div className="absolute bottom w-full m-2 ps-2 pe-2">
				{getOnOffText(props.device)}
			</div>
		</AppButton>
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

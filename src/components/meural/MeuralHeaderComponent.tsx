import React from "react";
import IOSSwitch from "../ui/IOSSwitch";
import { bindActionCreators } from "redux";
import { setMeuralOn } from "../../actions";
import { isOn } from "../../containers/MeuralPage";
import { connect } from "react-redux";
import type { Device } from "../../types";

interface MeuralHeaderComponentProps {
	back: () => void;
	name: string;
	device: Device | undefined;
	toggleOnOff: (device: Device | undefined) => void;
}

const MeuralHeaderComponent: React.FC<MeuralHeaderComponentProps> = ({
	back,
	name,
	device,
	toggleOnOff,
}) => {
	return (
		<div className="header tw:flex tw:flex-col">
			<div className="tw:flex tw:items-center tw:w-full tw:flex-row">
				<span className="tw:flex tw:items-center tw:flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
					{name}
				</span>
				<div className={"tw:grow"} />
				<IOSSwitch
					className="tw:me-6"
					checked={isOn(device)}
					onChange={() => toggleOnOff(device)}
				/>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			toggleOnOff: (devices: Device | undefined) => (dispatch: any) =>
				dispatch(setMeuralOn(!isOn(devices))),
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralHeaderComponent);

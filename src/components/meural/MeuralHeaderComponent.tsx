import React from "react";
import IOSSwitch from "../ui/IOSSwitch";
import { bindActionCreators } from "redux";
import { setMeuralOn } from "../../actions";
import { isOn } from "../../containers/MeuralPage";
import { connect } from "react-redux";
import type { AppDispatch, Device } from "../../types";

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
		<div className="header flex flex-col">
			<div className="flex items-center w-full flex-row">
				<span className="flex items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-1 text-black/30"></span>
					{name}
				</span>
				<div className={"grow"} />
				<IOSSwitch
					className="me-6"
					checked={isOn(device)}
					onChange={() => toggleOnOff(device)}
				/>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			toggleOnOff: (devices: Device | undefined) => setMeuralOn(!isOn(devices)),
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralHeaderComponent);

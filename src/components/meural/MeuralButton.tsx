import React from "react";
import AppButton from "../ui/AppButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { setMeuralOn } from "../../actions";
import { findMeuralDeviceFromRoom, isOn } from "../../containers/MeuralPage";
import type { Device, Room } from "../../types";

interface MeuralButtonProps {
	room: Room;
	changePage: (event: React.MouseEvent, isOn: boolean) => void;
}

const MeuralButton: React.FC<MeuralButtonProps> = (props) => (
	<AppButton
		onClick={(event: React.MouseEvent) =>
			props.changePage(event, isOn(findMeuralDeviceFromRoom(props.room)))
		}
		size="lg"
		className={"m-1 relative flex justify-center house-button"}
	>
		<i className={getButtonStyling(findMeuralDeviceFromRoom(props.room))} />
		<div className="absolute bottom w-full m-2 ps-2 pe-2">Meural</div>
	</AppButton>
);

export const getButtonStyling = (device: Device | undefined): string => {
	return "mdi mdi-image-" + (isOn(device) ? "frame" : "filter-frames");
};

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			changePage:
				(event: React.MouseEvent, isOn: boolean) => (dispatch: any) => {
					event.stopPropagation();
					if (!isOn) {
						dispatch(setMeuralOn(true));
					}
					dispatch(push("/Meural"));
				},
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralButton);

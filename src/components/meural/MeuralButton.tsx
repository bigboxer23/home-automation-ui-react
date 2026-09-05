import React from "react";
import AppButton from "../ui/AppButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { setMeuralOn } from "../../actions";
import { findMeuralDeviceFromRoom, isOn } from "../../containers/MeuralPage";
import type { AppDispatch, AppThunk, Device, Room } from "../../types";

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
		className={"m-1 relative flex justify-center"}
	>
		<i className={getButtonStyling(findMeuralDeviceFromRoom(props.room))} />
		<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">Meural</div>
	</AppButton>
);

export const getButtonStyling = (device: Device | undefined): string => {
	return (
		"mdi tile-icon text-black/30 mdi-image-" +
		(isOn(device) ? "frame" : "filter-frames")
	);
};

const mapDispatchToProps = (storeDispatch: AppDispatch) =>
	bindActionCreators(
		{
			changePage:
				(event: React.MouseEvent, meuralIsOn: boolean): AppThunk =>
				(dispatch) => {
					event.stopPropagation();
					if (!meuralIsOn) {
						dispatch(setMeuralOn(true));
					}
					dispatch(push("/Meural"));
				},
		},
		storeDispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralButton);

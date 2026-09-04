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
		className={"tw:m-1 tw:relative tw:flex tw:justify-center house-button"}
	>
		<i className={getButtonStyling(findMeuralDeviceFromRoom(props.room))} />
		<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
			Meural
		</div>
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

import React from "react";
import AppButton from "../ui/AppButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import type { DeviceMap, RootState } from "../../types";
import {
	getClimateData,
	getCurrentOutsideTemp,
	getThermostatDisplayInfo,
	getWaterHeaterColor,
	getWaterHeaterCurrentTemp,
	getWaterHeaterTemperature,
	getWaterHeaterWidth,
} from "../../containers/ClimatePage";
import { getFormattedTemp, getTempStyle } from "../../utils/WeatherUtilities";

interface ClimateButtonProps {
	deviceMap: DeviceMap;
	changePage: () => void;
}

const ClimateButton: React.FC<ClimateButtonProps> = (props) => (
	<AppButton
		onClick={() => props.changePage()}
		size="lg"
		className={"tw:m-1 tw:relative tw:flex tw:justify-center"}
	>
		<div
			className={
				"temp-display wh-temp-display tw:absolute tw:flex tw:justify-center tw:items-center"
			}
		>
			<div
				className={
					"wh-temp-display wh-temp-gauge tw:absolute " +
					getWaterHeaterColor(props.deviceMap)
				}
				style={getWaterHeaterWidth(props.deviceMap)}
			></div>
			<div className={"minor-text"}>
				{getWaterHeaterCurrentTemp(props.deviceMap)}
			</div>
		</div>
		<div
			className="temp-display tw:pe-1 tw:ps-1 tw:absolute"
			style={getTempStyle(getCurrentOutsideTemp(props.deviceMap))}
		>
			{getFormattedTemp(getCurrentOutsideTemp(props.deviceMap))}
		</div>
		<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
			<div className="minor-text">
				{getWaterHeaterTemperature(props.deviceMap)}
			</div>
			{getThermostatDisplayInfo(props.deviceMap)}
			Climate
		</div>
	</AppButton>
);

const mapStateToProps = (state: RootState) => ({
	deviceMap: getClimateData(state.house.rooms),
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			changePage: () => push("/Climate"),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ClimateButton);

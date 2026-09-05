import React from "react";
import AppButton from "../ui/AppButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import type { AppDispatch, DeviceMap, RootState } from "../../types";
import {
	getClimateData,
	getCurrentOutsideTemp,
	getThermostatDisplayInfo,
	getWaterHeaterGaugeStyle,
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
		className={"m-1 relative flex justify-center"}
	>
		<div
			className={
				"absolute top-2 left-2 min-w-8.75 max-w-10 w-full min-h-6 " +
				"rounded-lg bg-black/30 text-white flex justify-center items-center"
			}
		>
			<div
				className={
					"absolute left-0 max-w-10 min-h-6 " +
					getWaterHeaterGaugeStyle(props.deviceMap)
				}
				style={getWaterHeaterWidth(props.deviceMap)}
			></div>
			<div className={"text-[0.8rem] leading-[1.3] opacity-70"}>
				{getWaterHeaterCurrentTemp(props.deviceMap)}
			</div>
		</div>
		<div
			className="rounded-lg text-white right-2 top-2 min-w-8.75 flex justify-center pe-1 ps-1 absolute"
			style={getTempStyle(getCurrentOutsideTemp(props.deviceMap))}
		>
			{getFormattedTemp(getCurrentOutsideTemp(props.deviceMap))}
		</div>
		<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">
			<div className="text-[0.8rem] leading-[1.3] opacity-70">
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

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			changePage: () => push("/Climate"),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ClimateButton);

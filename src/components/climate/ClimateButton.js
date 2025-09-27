import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import {
	getClimateData,
	getCurrentOutsideTemp,
	getThermostatDisplayInfo,
	getWaterHeaterGaugeClass,
	getWaterHeaterHoverText,
	getWaterHeaterTemperature,
} from "../../containers/ClimatePage";
import { getFormattedTemp, getTempStyle } from "../../utils/WeatherUtilities";

const ClimateButton = (props) => (
	<Button
		onClick={() => props.changePage()}
		variant=""
		size="lg"
		className={"m-1 position-relative d-flex justify-content-center"}
	>
		<i
			className={getWaterHeaterGaugeClass(props.deviceMap)}
			title={getWaterHeaterHoverText(props.deviceMap)}
		></i>
		<div
			className="temp-display pe-1 ps-1 position-absolute"
			style={getTempStyle(getCurrentOutsideTemp(props.deviceMap))}
		>
			{getFormattedTemp(getCurrentOutsideTemp(props.deviceMap))}
		</div>
		<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
			<div className="minor-text">
				{getWaterHeaterTemperature(props.deviceMap)}
			</div>
			{getThermostatDisplayInfo(props.deviceMap)}
			Climate
		</div>
	</Button>
);

const mapStateToProps = (state) => ({
	deviceMap: getClimateData(state.house.rooms),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			changePage: () => push("/Climate"),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ClimateButton);

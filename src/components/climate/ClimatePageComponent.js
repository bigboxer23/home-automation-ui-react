import React from 'react'
import HeaderComponent from "../HeaderComponent"
import ReactBootstrapSlider from 'react-bootstrap-slider';
import {
	getCurrentOutsideTemp,
	getFanModeStyle,
	getInsideHumidity,
	getHVACStyle,
	getIndoorTemp,
	getThermostatSetPoint,
	getOutsideHumidity,
	getThermostatBattery, getThermometerItems
} from "../../containers/ClimatePage";
import {getFormattedTemp, getTempStyle, getIndoorTempStyle} from "../../utils/WeatherUtilities";
import MotionSensorComponent from "../room/MotionSensorComponent";

const ClimatePageComponent = ({back, deviceMap, sliderChange, slideStop, fanModeChange, hvacModeChange}) => (
		<div>
			<HeaderComponent back={back} name={"Climate"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				<div className="p-2 form-group w-100 d-flex">
					<label className="flex-grow-1">Outside</label>
					<div className="temp-display pr-1 pl-1 d-flex align-items-center" style={getTempStyle(getCurrentOutsideTemp(deviceMap))}>{getFormattedTemp(getCurrentOutsideTemp(deviceMap))} / {getOutsideHumidity(deviceMap)}</div>
				</div>
				<div className="p-2 form-group w-100 d-flex">
					<label className="flex-grow-1">Inside</label>
					<div className="temp-display pr-1 pl-1 d-flex align-items-center" style={getIndoorTempStyle(getIndoorTemp(deviceMap))}>{getFormattedTemp(getIndoorTemp(deviceMap))} / {getInsideHumidity(deviceMap)}</div>
				</div>
				{getThermometerItems(deviceMap)}
				<div className="thermostat-content w-100"><div className="p-2 form-group w-100 disabled">
					<label>Fan Mode</label>
					<div className="w-100 d-flex btn-group btn-group-toggle">
						<label className={getFanModeStyle("1", deviceMap)} onClick={() => fanModeChange("1")}>On</label>
						<label className={getFanModeStyle("0", deviceMap)} onClick={() => fanModeChange("0")}>Auto</label>
					</div>
				</div>
				<div className="p-2 form-group w-100 disabled">
					<label>HVAC Mode</label>
					<div className="w-100 d-flex btn-group btn-group-toggle">
						<label className={getHVACStyle("0", deviceMap)} onClick={() => hvacModeChange("0")}>Off</label>
						<label className={getHVACStyle("2", deviceMap)} onClick={() => hvacModeChange("2")}>Cool</label>
						<label className={getHVACStyle("1", deviceMap)} onClick={() => hvacModeChange("1")}>Heat</label>
					</div>
				</div>
				<div className="p-2 form-group w-100 d-flex disabled">
					<label className="flex-grow-1">Thermostat</label>
					<div className="temp-display pr-1 pl-1 d-flex align-items-center" style={getIndoorTempStyle(getThermostatSetPoint(deviceMap))}>{getFormattedTemp(getThermostatSetPoint(deviceMap))}</div>
				</div>
				<div className="p-2 form-group w-100 d-flex disabled">
						<ReactBootstrapSlider value={getThermostatSetPoint(deviceMap)}
						                      change={sliderChange}
						                      slideStop={slideStop}
						                      max={74}
						                      min={65}
						                      tooltip={"show"}/>
				</div>
				<MotionSensorComponent key={getThermostatBattery(deviceMap).name} device={getThermostatBattery(deviceMap)} styleName={"disabled"} />
				</div>
			</div>
		</div>
);

export default ClimatePageComponent
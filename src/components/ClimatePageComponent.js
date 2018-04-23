import React from 'react'
import HeaderComponent from "./HeaderComponent"
import ReactBootstrapSlider from 'react-bootstrap-slider';
import {getFanModeStyle, getHVACStyle, getIndoorTemp, getThermostatId} from "../containers/ClimatePage";

const ClimatePageComponent = ({back, deviceMap, sliderChange, fanModeChange, hvacModeChange}) => (
		<div>
			<HeaderComponent back={back} name={"Climate"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				<div className="form-group w-100">
					<label>Fan Mode</label>
					<div className="w-100 d-flex btn-group btn-group-toggle">
						<label className={getFanModeStyle("On", deviceMap)} onClick={() => fanModeChange("ContinuousOn", getThermostatId(deviceMap))}>On</label>
						<label className={getFanModeStyle("Auto", deviceMap)} onClick={() => fanModeChange("Auto", getThermostatId(deviceMap))}>Auto</label>
					</div>
				</div>
				<div className="form-group w-100">
					<label>HVAC Mode</label>
					<div className="w-100 d-flex btn-group btn-group-toggle">
						<label className={getHVACStyle("Off", deviceMap)} onClick={() => hvacModeChange("Off", getThermostatId(deviceMap))}>Off</label>
						<label className={getHVACStyle("Cool", deviceMap)} onClick={() => hvacModeChange("CoolOn", getThermostatId(deviceMap))}>Cool</label>
						<label className={getHVACStyle("Heat", deviceMap)} onClick={() => hvacModeChange("HeatOn", getThermostatId(deviceMap))}>Heat</label>
					</div>
				</div>
				<div className="form-group w-100">
					<label>Thermostat: {getIndoorTemp(deviceMap)}</label>
					<div className="d-flex btn-group btn-group-toggle justify-content-center">
					<ReactBootstrapSlider value={getIndoorTemp(deviceMap)}
					                      change={sliderChange}
					                      slideStop={slideStop}
					                      max={75}
					                      min={65}
					                      tooltip={"show"}/>
					</div>
				</div>
				<div className="tempLabel"></div>
			</div>
		</div>
);

const slideStop = (event) =>
{
	console.log("slide: " + event.target.value);
};

const change = (event) =>
{
	//console.log("change: " + event.target.value);
};

export default ClimatePageComponent
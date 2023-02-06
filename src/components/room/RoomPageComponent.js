import React from "react";
import HeaderComponent from "../HeaderComponent";
import LightComponent from "./LightComponent";
import RoomButton from "./RoomButton";
import {
  getHeaderTitle,
  getRoomDimLevel,
  isMotionDevice,
} from "../../containers/RoomPage";
import MotionSensorComponent from "./MotionSensorComponent";
import IOSSlider from "../ui/IOSSlider";
import IOSSwitch from "../ui/IOSSwitch";

const RoomPageComponent = ({
  back,
  room,
  sliderChange,
  slideStop,
  setDeviceStatus,
}) => (
  <div className={"room_component"}>
    <div className="background"></div>
    <HeaderComponent back={back} name={getHeaderTitle(room)} />
    <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
      <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
        <div className="form-group w-100">
          <div className="w-100 d-flex">
            <label className="ms-4 w-100">Overall Room</label>
            <IOSSwitch
              className="me-2"
              checked={getRoomDimLevel(room) > 0}
              onChange={(event) =>
                setDeviceStatus(room.id, event.target.checked)
              }
            />
          </div>
          <div className="d-flex btn-group btn-group-toggle justify-content-center">
            {
              <IOSSlider
                value={getRoomDimLevel(room)}
                onChange={(event, newValue) => sliderChange(newValue, room.id)}
                onChangeCommitted={(event, newValue) =>
                  slideStop(newValue, room.id)
                }
                valueLabelDisplay={"auto"}
                min={0}
                max={100}
              />
            }
          </div>
        </div>
      </div>
      {room.devices.map((device) =>
        RoomButton.isLight(device) ? (
          <LightComponent
            key={device.name}
            device={device}
            sliderChange={sliderChange}
            slideStop={slideStop}
            setDeviceStatus={setDeviceStatus}
          />
        ) : isMotionDevice(device) ? (
          <MotionSensorComponent key={device.name} device={device} />
        ) : (
          ""
        )
      )}
    </div>
  </div>
);

export default RoomPageComponent;

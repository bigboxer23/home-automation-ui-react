import React from "react";

const GarageAutoCloseButton = (props) => (
  <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
    <div className="pe-2 ps-2 pt-1 pb-1 w-100">
      <div className="w-100 d-flex btn-group btn-group-toggle">
        <label
          className={props.class + "btn btn-secondary w-100"}
          onClick={() => props.onClick(props.buttonText)}
        >
          {props.buttonText}
        </label>
      </div>
    </div>
  </div>
);

export default GarageAutoCloseButton;

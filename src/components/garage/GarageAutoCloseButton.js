import React from 'react'

const GarageAutoCloseButton = props => (
		<div className="form-group w-100">
			<div className="w-100 d-flex btn-group btn-group-toggle">
				<label className={props.class + "btn btn-secondary w-100"} onClick={() => props.onClick(props.buttonText)}>{props.buttonText}</label>
			</div>
		</div>
);

export default GarageAutoCloseButton
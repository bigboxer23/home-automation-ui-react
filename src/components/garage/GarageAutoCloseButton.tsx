import React from "react";

interface GarageAutoCloseButtonProps {
	class: string;
	buttonText: string;
	onClick: (buttonText: string) => void;
}

const GarageAutoCloseButton: React.FC<GarageAutoCloseButtonProps> = (props) => (
	<div className="p-2 w-full h-full flex flex-wrap justify-center content-start light_slider mb-2">
		<div className="pe-2 ps-2 pt-1 pb-1 w-full">
			<div className="w-full flex segmented-control">
				<label
					className={props.class + "segmented-option w-full"}
					onClick={() => props.onClick(props.buttonText)}
				>
					{props.buttonText}
				</label>
			</div>
		</div>
	</div>
);

export default GarageAutoCloseButton;

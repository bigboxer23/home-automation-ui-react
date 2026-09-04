import React from "react";

interface GarageAutoCloseButtonProps {
	class: string;
	buttonText: string;
	onClick: (buttonText: string) => void;
}

const GarageAutoCloseButton: React.FC<GarageAutoCloseButtonProps> = (props) => (
	<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start light_slider tw:mb-2">
		<div className="tw:pe-2 tw:ps-2 tw:pt-1 tw:pb-1 tw:w-full">
			<div className="tw:w-full tw:flex btn-group">
				<label
					className={props.class + "btn btn-secondary tw:w-full"}
					onClick={() => props.onClick(props.buttonText)}
				>
					{props.buttonText}
				</label>
			</div>
		</div>
	</div>
);

export default GarageAutoCloseButton;

import React from "react";
import { SegmentedControl, SegmentedOption } from "../ui/SegmentedControl";

interface GarageAutoCloseButtonProps {
	class: string;
	buttonText: string;
	onClick: (buttonText: string) => void;
}

const GarageAutoCloseButton: React.FC<GarageAutoCloseButtonProps> = (props) => (
	<div className="p-2 w-full h-full flex flex-wrap justify-center content-start bg-white/70 rounded-2xl mb-2">
		<div className="pe-2 ps-2 pt-1 pb-1 w-full">
			<SegmentedControl className="w-full">
				<SegmentedOption
					className={`w-full ${props.class}`}
					onClick={() => props.onClick(props.buttonText)}
				>
					{props.buttonText}
				</SegmentedOption>
			</SegmentedControl>
		</div>
	</div>
);

export default GarageAutoCloseButton;

import React from "react";

interface SceneHeaderComponentProps {
	back: () => void;
	name: string;
}

const SceneHeaderComponent: React.FC<SceneHeaderComponentProps> = ({
	back,
	name,
}) => {
	return (
		<div className="header tw:flex tw:flex-col">
			<div className="tw:flex tw:items-center tw:w-full tw:flex-row">
				<span className="tw:flex tw:items-center tw:flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
					{name}
				</span>
			</div>
		</div>
	);
};

export default SceneHeaderComponent;

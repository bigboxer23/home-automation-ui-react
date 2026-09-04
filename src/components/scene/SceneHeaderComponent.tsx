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
		<div className="header flex flex-col">
			<div className="flex items-center w-full flex-row">
				<span className="flex items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-1 text-black/30"></span>
					{name}
				</span>
			</div>
		</div>
	);
};

export default SceneHeaderComponent;

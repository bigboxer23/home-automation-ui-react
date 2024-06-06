import React from "react";

const SceneHeaderComponent = ({ back, name }) => {
	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span className="d-flex align-items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
					{name}
				</span>
			</div>
		</div>
	);
};

export default SceneHeaderComponent;

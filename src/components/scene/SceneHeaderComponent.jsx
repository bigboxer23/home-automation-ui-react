import React from "react";

const SceneHeaderComponent = function (props) {
	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span
					className="d-flex align-items-center flex-row"
					onClick={props.back}
				>
					<span
						className="mdi mdi-chevron-left mdi-36px z-index-1 "
						onClick={props.back}
					></span>
					{props.name}
				</span>
				<div className={"flex-grow-1"} />
			</div>
		</div>
	);
};

export default SceneHeaderComponent;

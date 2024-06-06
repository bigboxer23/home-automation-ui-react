import React from "react";

const HeaderComponent = ({ back, name }) => (
	<div className="header d-flex align-items-center">
		<div className="d-flex align-items-center sub-header h-100 w-100">
			<span className="d-flex align-items-center flex-row" onClick={back}>
				<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
				{name}
			</span>
		</div>
	</div>
);

export default HeaderComponent;

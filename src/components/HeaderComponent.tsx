import React from "react";

interface HeaderComponentProps {
	back: () => void;
	name: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ back, name }) => (
	<div className="header tw:flex tw:items-center">
		<div className="tw:flex tw:items-center sub-header tw:h-full tw:w-full">
			<span className="tw:flex tw:items-center tw:flex-row" onClick={back}>
				<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
				{name}
			</span>
		</div>
	</div>
);

export default HeaderComponent;

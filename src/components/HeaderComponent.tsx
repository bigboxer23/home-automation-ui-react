import React from "react";

interface HeaderComponentProps {
	back: () => void;
	name: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ back, name }) => (
	<div className="header flex items-center">
		<div className="flex items-center bg-white/20 h-full w-full">
			<span className="flex items-center flex-row" onClick={back}>
				<span className="mdi mdi-chevron-left mdi-36px z-1 text-black/30"></span>
				{name}
			</span>
		</div>
	</div>
);

export default HeaderComponent;

import React from "react";
import { Button } from "react-bootstrap";
import { hideInfo, showInfo } from "../../actions";

export default function MeuralShowInfoButton(props) {
	const shouldDisplay = (status) => {
		return (
			"m-1 position-relative d-flex justify-content-center" +
			("0" === status ? " d-none" : "")
		);
	};

	const getText = (show) => {
		return show ? "Show Artwork Info" : "Hide Artwork Info";
	};

	const getIcon = (show) => {
		return show ? "information-outline" : "information-off-outline";
	};

	const handleClick = (show) => {
		show ? showInfo() : hideInfo();
	};

	return (
		<div>
			<Button
				onClick={() => handleClick(props.show)}
				variant=""
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className={"mdi mdi-" + getIcon(props.show)} />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					{getText(props.show)}
				</div>
			</Button>
		</div>
	);
}

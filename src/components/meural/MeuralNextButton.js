import React from "react";
import { Button } from 'react-bootstrap'
import {nextMeuralImage} from "../../actions";

const MeuralNextButton = props => (
			<div>
				<Button onClick={() => nextMeuralImage()} variant="" size="lg" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
					<i className={getIconStyle(props.device?.status)}/>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">{generateText(props.device?.status)}</div>
				</Button>
			</div>
);

const generateText = (status) => {
	return ("1" === status ? "Generate New Image" : "Next Image");
}

const getIconStyle = (status) => {
	return "mdi mdi-image-" + ("1" === status ? "refresh-outline" : "move");
}

export default MeuralNextButton;
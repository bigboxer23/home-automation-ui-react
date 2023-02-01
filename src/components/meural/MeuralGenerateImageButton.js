import React from "react";
import { Button } from 'react-bootstrap'
import {nextMeuralImage} from "../../actions";

const MeuralGenerateImageButton = props => (
		<div>
			<Button onClick={() => nextMeuralImage()} variant="" size="lg" className={shouldDisplay(props.device?.status)}>
				<i className="mdi mdi-message-image-outline"/>
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Image from Prompt</div>
			</Button>
		</div>
);

const shouldDisplay = (status) => {
	return "m-1 position-relative d-flex justify-content-center" + ("1" === status ? "" : " d-none");
}
export default MeuralGenerateImageButton;
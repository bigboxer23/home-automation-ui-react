import React from "react";
import { Button } from 'react-bootstrap'
import {previousMeuralImage} from "../../actions";

const MeuralPreviousButton = props => (
		<div>
			<Button onClick={() => previousMeuralImage()} variant="" size="lg" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
				<i className="mdi mdi-image-move flip-horizontal"/>
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Previous Image</div>
			</Button>
		</div>
);

export default MeuralPreviousButton;
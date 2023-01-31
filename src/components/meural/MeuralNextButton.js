import React from "react";
import { Button } from 'react-bootstrap'
import {nextMeuralImage} from "../../actions";

const MeuralNextButton = props => (
			<div>
				<Button onClick={() => nextMeuralImage()} variant="" size="lg" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
					<i className="mdi mdi-image-move"/>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Next Image</div>
				</Button>
			</div>
);

export default MeuralNextButton;
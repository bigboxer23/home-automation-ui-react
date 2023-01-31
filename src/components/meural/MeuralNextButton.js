import React from "react";
import { Button } from 'react-bootstrap'

const MeuralNextButton = props => (
			<div>
				<Button  variant="" size="lg" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
					<i className="mdi mdi-lightbulb-group-outline"/>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Next Image</div>
				</Button>
			</div>
);

export default MeuralNextButton;
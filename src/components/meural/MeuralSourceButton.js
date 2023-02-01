import React from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {setMeuralOn, setMeuralSource} from "../../actions";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {connect} from "react-redux";

const MeuralSourceButton = props => (
			<div className={"meural-source-button pb-2"}>
				<div className={"ms-3 meural-source-button-label"}>Source</div>
				<ToggleButtonGroup
						color="primary"
						value={props.device?.status}
						exclusive
						aria-label="Source"
						onChange={props.onChange}
						orientation={"vertical"}
				>
					<ToggleButton disableRipple value="0" className={"mdi mdi-check-circle"}>Google Photos</ToggleButton>
					<ToggleButton disableRipple value="1" className={"mdi mdi-check-circle"}>OpenAI</ToggleButton>
				</ToggleButtonGroup>
			</div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	onChange: (event, value) => (dispatch) =>
	{
		if (value != null)
		{
			dispatch(setMeuralSource(value));
		}
	}
}, dispatch);

export default connect(
		null,
		mapDispatchToProps
)(MeuralSourceButton);
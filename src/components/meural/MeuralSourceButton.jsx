import React from "react";
import { Snackbar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { setMeuralSource } from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MuiAlert from "@mui/material/Alert";

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			onChange: (event, value) => (dispatch) => {
				dispatch(setMeuralSource(value));
			},
		},
		dispatch,
	);

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default connect(
	null,
	mapDispatchToProps,
)(function MeuralSourceButton(props) {
	const [open, setOpen] = React.useState(false);

	const handleClick = (event, value, props) => {
		if (value != null) {
			setOpen(true);
			props.onChange(event, value);
		}
	};

	return (
		<div className={"meural-source-button pt-3 pb-2"}>
			<ToggleButtonGroup
				color="primary"
				value={props.device?.status}
				exclusive
				aria-label="Source"
				onChange={(event, value) => handleClick(event, value, props)}
				orientation={"vertical"}
			>
				<div className={"ms-3 meural-source-button-label fw-bold pt-3 pb-2"}>
					Source
				</div>
				<ToggleButton
					disableRipple
					value="0"
					className={"mdi mdi-check-circle"}
				>
					Google Photos
				</ToggleButton>
				<ToggleButton
					disableRipple
					value="1"
					className={"mdi mdi-check-circle"}
				>
					OpenAI TextCompletion
				</ToggleButton>
				<ToggleButton
					disableRipple
					value="2"
					className={"mdi mdi-check-circle"}
				>
					ChatGPT-3
				</ToggleButton>
				<ToggleButton
					disableRipple
					value="3"
					className={"mdi mdi-check-circle"}
				>
					ChatGPT-4
				</ToggleButton>
				<ToggleButton
					disableRipple
					value="4"
					className={"mdi mdi-check-circle"}
				>
					James Webb Space Telescope
				</ToggleButton>
			</ToggleButtonGroup>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					severity="info"
					sx={{ width: "100%" }}
				>
					Changing Source...
				</Alert>
			</Snackbar>
		</div>
	);
});

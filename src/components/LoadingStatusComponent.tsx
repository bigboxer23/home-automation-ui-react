import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingStatusComponentProps {
	loaded: number | null | undefined;
	authError: boolean;
}

const LoadingStatusComponent: React.FC<LoadingStatusComponentProps> = ({
	loaded,
	authError,
}) => getLoadContent(loaded, authError);

const getLoadContent = function (
	theLoadedTime: number | null | undefined,
	authError: boolean,
): React.ReactElement | string {
	if (authError) {
		return (
			<div className="LoadingStatus d-flex justify-content-center align-items-center position-absolute">
				<CircularProgress
					sx={{ color: "#28a745" }}
					size="2rem"
					className={"me-2"}
				/>
				<div className="authText">
					Say <b>'Alexa, turn on Authorize'</b>
				</div>
			</div>
		);
	} else if (theLoadedTime == null) {
		return (
			<div className="LoadingStatus d-flex justify-content-center align-items-center position-absolute">
				<CircularProgress
					sx={{ color: "#28a745" }}
					size="2rem"
					className={"me-2"}
				/>
				Loading...
			</div>
		);
	}
	return "";
};

export default LoadingStatusComponent;

import React from "react";
import { formatBuildDetail, getBuildInfo } from "../utils/BuildInfo";

const PageFooter: React.FC = () => {
	const buildInfo = getBuildInfo();
	return (
		<div className="page-footer tw:flex tw:justify-center tw:p-4 tw:mt-auto">
			<span
				className="minor-text text-white"
				title={formatBuildDetail(buildInfo)}
			>
				{buildInfo.version}
			</span>
		</div>
	);
};

export default PageFooter;

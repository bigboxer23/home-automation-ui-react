import React from "react";
import { formatBuildDetail, getBuildInfo } from "../utils/BuildInfo";

const PageFooter: React.FC = () => {
	const buildInfo = getBuildInfo();
	return (
		<div className="page-footer flex justify-center p-4 mt-auto">
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

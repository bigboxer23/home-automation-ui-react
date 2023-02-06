import React from "react";

class HeaderComponent extends React.Component {
	render() {
		return (
			<div className="header d-flex align-items-center">
				<div className="d-flex align-items-center sub-header h-100 w-100">
					<span
						className="mdi mdi-chevron-left mdi-36px position-absolute z-index-1"
						onClick={this.props.back}
					></span>
					<div className={"col text-center"}>{this.props.name}</div>
				</div>
			</div>
		);
	}
}

export default HeaderComponent;

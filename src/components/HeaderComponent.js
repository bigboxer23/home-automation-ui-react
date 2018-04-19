import React from "react";

class HeaderComponent extends React.Component
{
	render()
	{
		return <div className="header d-flex align-items-center"><span className="mdi mdi-chevron-left mdi-36px" onClick={this.props.back}></span></div>;
	}
}

export default HeaderComponent;

import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

const ScenesButton = props => (
		<Button onClick={() => props.changePage()} variant="" size="lg" className={"btn-large m-1 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-clock"></i>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Scenes</div>
		</Button>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: () => push('/Scenes')
}, dispatch);

export default connect(
		null,
		mapDispatchToProps
)(ScenesButton)
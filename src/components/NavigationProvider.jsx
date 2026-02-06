import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigationInstance } from "../utils/navigation";

// Component that sets up navigation for the compatibility layer
const NavigationProvider = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		setNavigationInstance(navigate);
	}, [navigate]);

	return children;
};

export default NavigationProvider;

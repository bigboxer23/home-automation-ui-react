import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigationInstance } from "../utils/navigation";

interface NavigationProviderProps {
	children: React.ReactNode;
}

// Component that sets up navigation for the compatibility layer
const NavigationProvider: React.FC<NavigationProviderProps> = ({
	children,
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		setNavigationInstance(navigate);
	}, [navigate]);

	return children;
};

export default NavigationProvider;

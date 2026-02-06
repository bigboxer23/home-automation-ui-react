declare module "react-spinkit" {
	import { Component } from "react";
	interface SpinnerProps {
		name?: string;
		fadeIn?: string;
		className?: string;
		overrideSpinnerClassName?: string;
		color?: string;
		style?: React.CSSProperties;
	}
	export default class Spinner extends Component<SpinnerProps> {}
}

declare module "*.css";

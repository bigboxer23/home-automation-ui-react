import React from "react";

/**
 * Semantic button state. This replaces react-bootstrap's `variant`, which used
 * to smuggle state into the markup as `btn-success` / `btn-danger` so that
 * descendant CSS rules could react to it. Those rules now key off `data-state`,
 * which survives the move off Bootstrap.
 */
export type ButtonState = "on" | "off" | "alert" | "primary";

interface AppButtonProps extends Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	"type"
> {
	state?: ButtonState;
	size?: "lg";
}

export default function AppButton({
	state = "off",
	size,
	className,
	children,
	...rest
}: AppButtonProps): React.ReactElement {
	const classes = ["btn", size === "lg" ? "btn-lg" : "", className ?? ""]
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();

	return (
		<button type="button" data-state={state} className={classes} {...rest}>
			{children}
		</button>
	);
}

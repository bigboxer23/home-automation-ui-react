import React from "react";

/**
 * Semantic button state, rendered as a `data-state` attribute. Descendant rules
 * in index.css key off it - an "on" room swaps its bulb glyph, an "alert" garage
 * turns red - so state stays out of the class list.
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

import React from "react";

/**
 * The Fan Mode / HVAC Mode / auto-close pickers: a row of options that reads as
 * one control. Replaces the old `.segmented-control` / `.segmented-option`
 * pair in index.css.
 */
export function SegmentedControl({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}): React.ReactElement {
	return (
		<div className={`relative flex align-middle rounded-md ${className ?? ""}`}>
			{children}
		</div>
	);
}

/**
 * Square off the inner edges and pull the options together by a pixel, so the
 * shared borders collapse into one line.
 */
const SEAMS =
	"[&:not(:last-child)]:rounded-r-none " +
	"[&:not(:first-child)]:-ml-px [&:not(:first-child)]:rounded-l-none";

const SHARED =
	"relative flex-auto px-3 py-1.5 text-base font-normal text-center align-middle " +
	"cursor-pointer select-none text-white border rounded-md " +
	"transition-all duration-300 active:bg-white! active:border-transparent! " +
	SEAMS;

/**
 * Selected and unselected are mutually exclusive rather than layered, for the
 * same reason `AppButton`'s sizes are: one background utility per element, so
 * the winner is not decided by Tailwind's output order. The unselected branch
 * owns the hover treatment too, which preserves the old behaviour where a
 * selected option did not react to hover.
 */
const SELECTED = "bg-segment-active border-segment-active-border z-1";
const UNSELECTED =
	"bg-segment border-segment " +
	"hover:bg-segment-hover hover:border-segment-active hover:z-1";

interface SegmentedOptionProps {
	active?: boolean;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export function SegmentedOption({
	active = false,
	className,
	onClick,
	children,
}: SegmentedOptionProps): React.ReactElement {
	const classes = [SHARED, active ? SELECTED : UNSELECTED, className ?? ""]
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();

	return (
		<label className={classes} onClick={onClick}>
			{children}
		</label>
	);
}

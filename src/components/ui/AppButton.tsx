import React from "react";

/**
 * Semantic button state, rendered as a `data-state` attribute. Descendants key
 * off it with a `[[data-state=…]_&]` variant - an "on" room's bulb turns
 * yellow, an "alert" garage turns white - so state stays out of the class list.
 */
export type ButtonState = "on" | "off" | "alert" | "primary";

/** Everything both sizes share. Nothing here sets a property `SIZE` sets. */
const SHARED =
	"text-base font-normal no-underline align-middle cursor-pointer select-none " +
	"border border-transparent transition-all duration-300 " +
	"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
	"disabled:pointer-events-none disabled:opacity-65 " +
	// The press flash is marked important so it beats the state colours below.
	// It used to win on specificity (`.btn:active` at 0,2,0 over `[data-state]`
	// at 0,1,0); as utilities the two tie, and Tailwind emits `:active` first,
	// which would have silently dropped the flash on alert and primary buttons.
	// This also makes it beat the hover rules, which the old source order let
	// win by accident - pressing now always flashes white, whatever the state.
	"active:bg-white! active:border-transparent!";

/**
 * Size owns every property that the old `.btn-lg` used to override on `.btn`,
 * so exactly one value for each reaches the element. Two utilities competing
 * for one property would be resolved by Tailwind's output order rather than by
 * anything readable here, which is why these are a lookup and not a union of
 * strings.
 *
 * `panel` is the wide prompt row - a button shaped like a card rather than a
 * tile. It replaces the old `.meural-prompt-display` overrides.
 */
const SIZE: Record<"sm" | "lg" | "panel", string> = {
	sm: "px-3 py-1.5 rounded-md text-center text-ink bg-transparent",
	lg:
		"h-[115px] w-[115px] px-8 py-2 rounded-xl text-left whitespace-normal " +
		"text-black/60 bg-white/50 data-[state=off]:hover:bg-white/70",
	panel:
		"h-auto w-full p-4 rounded-xl text-left whitespace-normal " +
		"text-black/60 bg-white",
};

/**
 * State colours. Each variant repeats `[data-state=…]` in its own selector, so
 * it lands at specificity (0,2,0) and outranks the (0,1,0) size colours above
 * whatever order Tailwind emits them in.
 */
const STATE =
	"data-[state=on]:bg-white/90 data-[state=on]:border-white/90 data-[state=on]:text-ink " +
	"data-[state=alert]:bg-danger data-[state=alert]:border-danger data-[state=alert]:text-white " +
	"data-[state=primary]:bg-primary data-[state=primary]:border-primary data-[state=primary]:text-white " +
	"data-[state=primary]:hover:bg-primary-hover data-[state=primary]:hover:border-primary-hover-border";

interface AppButtonProps extends Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	"type"
> {
	state?: ButtonState;
	size?: "lg" | "panel";
}

export default function AppButton({
	state = "off",
	size,
	className,
	children,
	...rest
}: AppButtonProps): React.ReactElement {
	const classes = [SHARED, SIZE[size ?? "sm"], STATE, className ?? ""]
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();

	return (
		<button type="button" data-state={state} className={classes} {...rest}>
			{children}
		</button>
	);
}

// Mock react-router-dom for Vitest
import React from "react";

const mockNavigate = vi.fn();

export const BrowserRouter = ({ children }: { children: React.ReactNode }) =>
	children;
export const MemoryRouter = ({ children }: { children: React.ReactNode }) =>
	children;
export const Routes = ({ children }: { children: React.ReactNode }) => children;
export const Route = ({
	element,
}: {
	element?: React.ReactNode;
	path?: string;
}) => element || null;
export const useParams = () => ({ name: "Living Room" });
export const useNavigate = () => mockNavigate;
export const useLocation = () => ({ pathname: "/test" });
export const Link = ({
	children,
	to,
	...props
}: {
	children: React.ReactNode;
	to: string;
	[key: string]: any;
}) => React.createElement("a", { href: to, ...props }, children);
export const NavLink = ({
	children,
	to,
	...props
}: {
	children: React.ReactNode;
	to: string;
	[key: string]: any;
}) => React.createElement("a", { href: to, ...props }, children);

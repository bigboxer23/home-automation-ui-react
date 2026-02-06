// Mock react-router-dom for Vitest
import React from "react";

const mockNavigate = vi.fn();

export const BrowserRouter = ({ children }) => children;
export const MemoryRouter = ({ children }) => children;
export const Routes = ({ children }) => children;
export const Route = ({ element }) => element || null;
export const useParams = () => ({ name: "Living Room" });
export const useNavigate = () => mockNavigate;
export const useLocation = () => ({ pathname: "/test" });
export const Link = ({ children, to, ...props }) =>
	React.createElement("a", { href: to, ...props }, children);
export const NavLink = ({ children, to, ...props }) =>
	React.createElement("a", { href: to, ...props }, children);

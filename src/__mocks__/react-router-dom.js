// Mock react-router-dom for Jest
const mockNavigate = jest.fn();

module.exports = {
	BrowserRouter: ({ children }) => children,
	MemoryRouter: ({ children }) => children,
	Routes: ({ children }) => children,
	Route: ({ element }) => element || null,
	useParams: () => ({ name: "Living Room" }),
	useNavigate: () => mockNavigate,
	useLocation: () => ({ pathname: "/test" }),
	Link: ({ children, to, ...props }) =>
		React.createElement("a", { href: to, ...props }, children),
	NavLink: ({ children, to, ...props }) =>
		React.createElement("a", { href: to, ...props }, children),
};

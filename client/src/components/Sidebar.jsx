import { LayoutGrid, UserRound, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
	{ to: "/user-profile", label: "User Profile", icon: UserRound },
	{ to: "/kanban-board", label: "Kanban Board", icon: LayoutGrid },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
	const navigate = useNavigate();

	const handleSignOut = () => {
		onClose();
		navigate("/login");
	};

	const renderNav = () => (
		<>
			<div className="flex items-center justify-between mb-10">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#c9a96e] to-[#a07840]">
						<div className="w-4 h-4 bg-white rotate-45" />
					</div>
					<span className="font-bold text-xl text-[#3b2e1e]">Prism</span>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="md:hidden rounded-xl p-2 text-[#8a7560] hover:bg-[#f5f0e8]"
				>
					<X size={18} />
				</button>
			</div>

			<nav className="space-y-2">
				{navItems.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						onClick={onClose}
						className={({ isActive }) =>
							`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
								isActive
									? "bg-[#f0e9de] text-[#3b2e1e]"
									: "text-[#8a7560] hover:bg-[#f5f0e8] hover:text-[#3b2e1e]"
							}`
						}
					>
						<Icon size={17} />
						{label}
					</NavLink>
				))}
			</nav>

			<button
				onClick={handleSignOut}
				className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-[#8a7560] hover:bg-[#f5f0e8] hover:text-[#3b2e1e] transition-colors"
			>
				<LogOut size={17} />
				Sign out
			</button>
		</>
	);

	return (
		<>
			<aside className="hidden md:block md:w-72 shrink-0 bg-[#fdf8f2] border-r border-[rgba(180,155,115,0.2)] p-6 md:min-h-screen">
				{renderNav()}
			</aside>

			{isOpen && (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						type="button"
						onClick={onClose}
						className="absolute inset-0 bg-black/35"
					/>
					<aside className="relative z-10 w-72 max-w-[86vw] h-full bg-[#fdf8f2] border-r border-[rgba(180,155,115,0.2)] p-6 shadow-2xl">
						{renderNav()}
					</aside>
				</div>
			)}
		</>
	);
}


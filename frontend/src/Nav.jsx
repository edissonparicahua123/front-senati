import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/home', icon: '🏠', label: 'Dashboard', gradient: 'from-blue-500 to-cyan-500' },
        { path: '/productos', icon: '📦', label: 'Productos', gradient: 'from-purple-500 to-pink-500' },
        { path: '/category', icon: '📂', label: 'Categorías', gradient: 'from-orange-500 to-yellow-500' },
        { path: '/proveedores', icon: '🏢', label: 'Proveedores', gradient: 'from-green-500 to-emerald-500' },
        { path: '/almacenes', icon: '🏭', label: 'Almacenes', gradient: 'from-indigo-500 to-purple-500' },
        { path: '/movimientos', icon: '📊', label: 'Movimientos', gradient: 'from-red-500 to-pink-500' },
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col fixed h-screen left-0 top-0 shadow-2xl border-r border-white/10">
            {/* Logo section */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-75"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-xl">
                                <span className="text-xl">⚡</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                SENATRONICS
                            </h2>
                            <p className="text-xs text-gray-400">Sistema Premium</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item, index) => (
                    <button
                        key={item.path}
                        className={`relative w-full group ${isActive(item.path) ? 'scale-105' : ''}`}
                        onClick={() => navigate(item.path)}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        {/* Glow effect on hover */}
                        {(isActive(item.path) || isHovered === index) && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur-lg opacity-50 transition-opacity duration-300`}></div>
                        )}

                        {/* Button content */}
                        <div className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive(item.path)
                                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                            }`}>
                            <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>

                            {/* Active indicator */}
                            {isActive(item.path) && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </div>
                    </button>
                ))}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-white/10 space-y-3">
                {/* User info */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {localStorage.getItem("user")?.charAt(0).toUpperCase() || "U"}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                            {localStorage.getItem("user") || "Usuario"}
                        </p>
                        <p className="text-xs text-gray-400">Administrador</p>
                    </div>
                </div>

                {/* Logout button */}
                <button
                    className="relative w-full group overflow-hidden"
                    onClick={handleLogout}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 border border-white/10 rounded-xl text-white transition-all duration-300 group-hover:border-transparent">
                        <span className="text-xl transform group-hover:rotate-12 transition-transform duration-300">🚪</span>
                        <span className="font-medium">Cerrar Sesión</span>
                    </div>
                </button>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
        </aside>
    );
}

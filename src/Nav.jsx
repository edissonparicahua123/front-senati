import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path ? "bg-white/20" : "hover:bg-white/10";

    return (
        <aside className="w-64 bg-blue-700 text-white flex flex-col fixed h-screen left-0 top-0">
            <div className="p-5 border-b border-white/20">
                <h2 className="m-0 text-2xl font-bold">SENATI</h2>
            </div>
            <nav className="flex-1 p-4 flex flex-col gap-2">
                <button
                    className={`flex items-center gap-3 p-3 w-full text-left border-none rounded-md text-white cursor-pointer transition-colors text-base ${isActive('/home')}`}
                    onClick={() => navigate("/home")}
                >
                    <span className="text-xl">🏠</span>
                    <span>Home</span>
                </button>
                <button
                    className={`flex items-center gap-3 p-3 w-full text-left border-none rounded-md text-white cursor-pointer transition-colors text-base ${isActive('/category')}`}
                    onClick={() => navigate("/category")}
                >
                    <span className="text-xl">📂</span>
                    <span>Categorías</span>
                </button>
                <button
                    className={`flex items-center gap-3 p-3 w-full text-left border-none rounded-md text-white cursor-pointer transition-colors text-base ${isActive('/product')}`}
                    onClick={() => navigate("/product")}
                >
                    <span className="text-xl">📦</span>
                    <span>Productos</span>
                </button>
            </nav>
            <div className="p-4 border-t border-white/20">
                <button
                    className="flex items-center gap-3 p-3 w-full bg-transparent border border-white/30 rounded-md text-white cursor-pointer text-base hover:bg-white/10 transition-colors"
                    onClick={handleLogout}
                >
                    <span className="text-xl">🚪</span>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}

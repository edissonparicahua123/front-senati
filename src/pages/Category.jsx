import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

export default function Category() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token || token !== "123") {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
        }
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Nav />
            <main className="flex-1 ml-64">
                <header className="h-[70px] bg-blue-100 border-b border-blue-200 px-8 flex items-center justify-between">
                    <div className="page-title">
                        <h1 className="m-0 text-2xl text-blue-700 font-bold">Categorías</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 bg-blue-50 border-none rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-white transition-colors">
                            <span>🔔</span>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-1.5 py-0.5 rounded-full font-bold">3</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold cursor-pointer" title={userName}>
                            <span>{userName ? userName.charAt(0).toUpperCase() : "👤"}</span>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="m-0 text-3xl text-blue-800 font-bold">Gestión de Categorías</h2>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white border-none rounded-md cursor-pointer text-base font-medium hover:bg-blue-800 transition-colors shadow-sm">
                            <span>➕</span>
                            <span>Nueva Categoría</span>
                        </button>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-10 min-h-[400px] flex items-center justify-center shadow-sm">
                        <p className="text-gray-600 text-base text-center">Contenido de categorías aquí</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

export default function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
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
                        <h1 className="m-0 text-2xl text-blue-700 font-bold">Home</h1>
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
                    <div className="mb-8">
                        <h2 className="m-0 mb-2 text-3xl text-blue-800 font-bold">Bienvenido a SENATI</h2>
                        <p className="m-0 text-gray-600 text-base">Panel de administración</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-10 shadow-sm">
                        <div className="welcome-card">
                            <h3 className="m-0 mb-4 text-2xl text-blue-800 font-bold">Dashboard Principal</h3>
                            <p className="m-0 text-gray-700 text-base">Contenido del home aquí</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

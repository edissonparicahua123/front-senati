import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        nombres: "",
        rol: "admin"
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse move effect for background
    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!user.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email inválido";
        }
        if (!user.password || user.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }
        if (!user.nombres.trim()) {
            newErrors.nombres = "El nombre es requerido";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/register", user);
            alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
            navigate("/");
        } catch (error) {
            console.error("Error en registro:", error);
            setErrors({
                email: error.response?.data?.message || "Error al crear la cuenta",
                password: "Por favor verifica los datos"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden flex items-center justify-center p-5 bg-gray-900"
            onMouseMove={handleMouseMove}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 animate-gradient-shift"></div>

            {/* Floating orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            {/* Mouse follower gradient */}
            <div
                className="absolute w-96 h-96 rounded-full opacity-20 pointer-events-none transition-all duration-300 ease-out mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
                    left: `${mousePosition.x - 192}px`,
                    top: `${mousePosition.y - 192}px`,
                }}
            ></div>

            {/* Register card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-all duration-500">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform hover:rotate-12 transition-transform duration-300">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Crear Cuenta</h1>
                        <p className="text-white/60 text-sm">Únete a SENATRONICS</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-white/90 text-sm font-medium block">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombres"
                                value={user.nombres}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                className={`w-full p-4 bg-white/5 backdrop-blur-xl border ${errors.nombres ? 'border-red-400' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                            />
                            {errors.nombres && <p className="text-red-300 text-xs">{errors.nombres}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/90 text-sm font-medium block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                className={`w-full p-4 bg-white/5 backdrop-blur-xl border ${errors.email ? 'border-red-400' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                            />
                            {errors.email && <p className="text-red-300 text-xs">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/90 text-sm font-medium block">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full p-4 bg-white/5 backdrop-blur-xl border ${errors.password ? 'border-red-400' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                            />
                            {errors.password && <p className="text-red-300 text-xs">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/90 text-sm font-medium block">Rol</label>
                            <div className="relative">
                                <select
                                    name="rol"
                                    value={user.rol}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="admin" className="bg-gray-800 text-white">Administrador</option>
                                    <option value="user" className="bg-gray-800 text-white">Usuario</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full group mt-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Crear Cuenta</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </>
                                )}
                            </div>
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-white/60 text-sm">
                                ¿Ya tienes cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="text-blue-300 font-semibold hover:text-blue-200 hover:underline bg-transparent border-none cursor-pointer transition-colors"
                                >
                                    Inicia sesión aquí
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-gradient-shift {
                    background-size: 200% 200%;
                    animation: gradient-shift 15s ease infinite;
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

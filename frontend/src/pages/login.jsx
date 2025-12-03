import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/home");
        }

        // Mouse move effect
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [navigate]);

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
        if (!user.username.trim()) {
            newErrors.username = "El usuario es requerido";
        }
        if (!user.password) {
            newErrors.password = "La contraseña es requerida";
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
            const response = await api.post("/auth/login", {
                email: user.username,
                password: user.password
            });

            const { token } = response.data;
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", user.username);
            navigate("/home");
        } catch (error) {
            setErrors({
                username: "Credenciales inválidas",
                password: error.response?.data?.message || "Usuario o contraseña incorrectos"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-5">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient-shift"></div>

            {/* Floating orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            {/* Mouse follower gradient */}
            <div
                className="absolute w-96 h-96 rounded-full opacity-30 pointer-events-none transition-all duration-300 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    left: `${mousePosition.x - 192}px`,
                    top: `${mousePosition.y - 192}px`,
                }}
            ></div>

            {/* Login card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500">
                    {/* Logo and title */}
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
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            SENATRONICS
                        </h1>
                        <p className="text-white/80 text-sm font-light">Sistema de Inventario Electrónico</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email input */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-white/90 text-sm font-medium block">
                                Correo Electrónico
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    placeholder="usuario@senatronics.com"
                                    className={`relative w-full p-4 bg-white/10 backdrop-blur-xl border ${errors.username ? 'border-red-400' : 'border-white/20'
                                        } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300`}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-300 text-xs flex items-center gap-1 animate-shake">
                                    <span>⚠️</span> {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-white/90 text-sm font-medium block">
                                Contraseña
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`relative w-full p-4 bg-white/10 backdrop-blur-xl border ${errors.password ? 'border-red-400' : 'border-white/20'
                                        } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300`}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-300 text-xs flex items-center gap-1 animate-shake">
                                    <span>⚠️</span> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full group mt-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Iniciando sesión...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Iniciar Sesión</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Register link */}
                        <div className="text-center pt-4">
                            <p className="text-white/70 text-sm">
                                ¿No tienes cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="text-white font-semibold hover:underline bg-transparent border-none cursor-pointer transition-all hover:text-blue-200"
                                >
                                    Regístrate aquí
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse animation-delay-1000"></div>
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
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
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
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}

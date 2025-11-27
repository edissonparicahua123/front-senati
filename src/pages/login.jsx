import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token === "123") {
            navigate("/home");
        }
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
        setTimeout(() => {
            setIsLoading(false);
            if (user.username === "admin@gmail.com" && user.password === "123") {
                localStorage.setItem("authToken", "123");
                localStorage.setItem("user", user.username);
                navigate("/home");
            } else {
                setErrors({
                    username: "Credenciales inválidas",
                    password: "Usuario o contraseña incorrectos"
                });
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-blue-400 p-5">
            <div className="bg-blue-50 rounded-lg p-10 w-full max-w-md shadow-lg">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-blue-700 m-0">SENATI</h1>
                    </div>
                    <p className="text-gray-600 text-sm m-0">Bienvenido de vuelta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-gray-800 text-sm font-medium">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 ${errors.username ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-800 text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white border-none p-3 rounded-md text-base font-medium cursor-pointer hover:bg-blue-800 disabled:bg-gray-400 mt-2 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}

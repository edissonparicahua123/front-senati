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
            console.log("Registrando usuario:", { ...user, password: "***" });
            const response = await api.post("/auth/register", user);

            console.log("Usuario registrado exitosamente:", response.data);
            alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
            navigate("/");
        } catch (error) {
            console.error("Error en registro:", error);
            console.error("Respuesta del error:", error.response?.data);
            setErrors({
                email: error.response?.data?.message || "Error al crear la cuenta",
                password: "Por favor verifica los datos"
            });
        } finally {
            setIsLoading(false);
        }
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
                    <p className="text-gray-600 text-sm m-0">Crear nueva cuenta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nombres" className="text-gray-800 text-sm font-medium">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            value={user.nombres}
                            onChange={handleChange}
                            placeholder="Ingresa tu nombre completo"
                            className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 ${errors.nombres ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.nombres && <span className="text-red-500 text-xs">{errors.nombres}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-800 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu email"
                            className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-800 text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="rol" className="text-gray-800 text-sm font-medium">Rol</label>
                        <select
                            id="rol"
                            name="rol"
                            value={user.rol}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                        >
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white border-none p-3 rounded-md text-base font-medium cursor-pointer hover:bg-blue-800 disabled:bg-gray-400 mt-2 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        <p>¿Ya tienes cuenta? <button type="button" onClick={() => navigate("/")} className="text-blue-700 font-medium hover:underline bg-transparent border-none cursor-pointer">Inicia sesión aquí</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

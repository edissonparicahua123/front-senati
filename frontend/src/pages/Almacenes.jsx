import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { almacenService } from "../services/senatronics.service";

export default function Almacenes() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAlmacen, setEditingAlmacen] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        ubicacion: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
            loadAlmacenes();
        }
    }, [navigate]);

    const loadAlmacenes = async () => {
        try {
            setLoading(true);
            const data = await almacenService.getAll();
            setAlmacenes(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar almacenes");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAlmacen) {
                await almacenService.update(editingAlmacen.id_almacen, formData);
                alert("Almacén actualizado exitosamente");
            } else {
                await almacenService.create(formData);
                alert("Almacén creado exitosamente");
            }
            setShowModal(false);
            resetForm();
            loadAlmacenes();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar el almacén");
        }
    };

    const handleEdit = (almacen) => {
        setEditingAlmacen(almacen);
        setFormData({
            nombre: almacen.nombre,
            ubicacion: almacen.ubicacion || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este almacén?")) {
            try {
                await almacenService.delete(id);
                alert("Almacén eliminado exitosamente");
                loadAlmacenes();
            } catch (error) {
                console.error("Error:", error);
                alert(error.response?.data?.mensaje || "Error al eliminar el almacén");
            }
        }
    };

    const resetForm = () => {
        setFormData({ nombre: "", ubicacion: "" });
        setEditingAlmacen(null);
    };

    const warehouseIcons = ['🏭', '📦', '🏢', '🏬', '🏪', '🏛️', '🏗️', '🏘️'];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            🏭 Almacenes
                        </h1>
                        <p className="text-sm text-gray-400">Gestiona tus almacenes</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Gestión de Almacenes</h2>
                            <p className="text-gray-400">{almacenes.length} almacenes registrados</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                Nuevo Almacén
                            </div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {almacenes.map((almacen, index) => (
                                <div key={almacen.id_almacen} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-75"></div>
                                                <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                                    {warehouseIcons[index % warehouseIcons.length]}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(almacen)}
                                                    className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg transition-colors"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(almacen.id_almacen)}
                                                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition-colors"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                            {almacen.nombre}
                                        </h3>

                                        <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                                            <span>📍</span> {almacen.ubicacion || 'Sin ubicación'}
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">ID: {almacen.id_almacen}</span>
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
                            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                        {editingAlmacen ? "✏️ Editar Almacén" : "➕ Nuevo Almacén"}
                                    </h3>
                                    <button
                                        onClick={() => { setShowModal(false); resetForm(); }}
                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                                            placeholder="Ej: Almacén Central"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Ubicación</label>
                                        <textarea
                                            value={formData.ubicacion}
                                            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none resize-none"
                                            rows="3"
                                            placeholder="Describe la ubicación..."
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-6">
                                        <button type="submit" className="flex-1 group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold">
                                                {editingAlmacen ? "💾 Actualizar" : "✨ Crear"}
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowModal(false); resetForm(); }}
                                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}

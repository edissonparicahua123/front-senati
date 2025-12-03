import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { proveedorService } from "../services/senatronics.service";

export default function Proveedores() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProveedor, setEditingProveedor] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
            loadProveedores();
        }
    }, [navigate]);

    const loadProveedores = async () => {
        try {
            setLoading(true);
            const data = await proveedorService.getAll();
            setProveedores(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar proveedores");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProveedor) {
                await proveedorService.update(editingProveedor.id_proveedor, formData);
                alert("Proveedor actualizado exitosamente");
            } else {
                await proveedorService.create(formData);
                alert("Proveedor creado exitosamente");
            }
            setShowModal(false);
            resetForm();
            loadProveedores();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar el proveedor");
        }
    };

    const handleEdit = (proveedor) => {
        setEditingProveedor(proveedor);
        setFormData({
            nombre: proveedor.nombre,
            telefono: proveedor.telefono || "",
            correo: proveedor.correo || "",
            direccion: proveedor.direccion || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este proveedor?")) {
            try {
                await proveedorService.delete(id);
                alert("Proveedor eliminado exitosamente");
                loadProveedores();
            } catch (error) {
                console.error("Error:", error);
                alert(error.response?.data?.mensaje || "Error al eliminar el proveedor");
            }
        }
    };

    const resetForm = () => {
        setFormData({ nombre: "", telefono: "", correo: "", direccion: "" });
        setEditingProveedor(null);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            🏢 Proveedores
                        </h1>
                        <p className="text-sm text-gray-400">Gestiona tus proveedores</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Gestión de Proveedores</h2>
                            <p className="text-gray-400">{proveedores.length} proveedores registrados</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                Nuevo Proveedor
                            </div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {proveedores.map((proveedor) => (
                                <div key={proveedor.id_proveedor} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-md opacity-75"></div>
                                                <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                                    🏢
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(proveedor)}
                                                    className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg transition-colors"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(proveedor.id_proveedor)}
                                                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition-colors"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3">{proveedor.nombre}</h3>

                                        <div className="space-y-2 text-sm text-gray-400">
                                            <p className="flex items-center gap-2">
                                                <span>📞</span> {proveedor.telefono || 'N/A'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span>📧</span> {proveedor.correo || 'N/A'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span>📍</span> {proveedor.direccion || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">ID: {proveedor.id_proveedor}</span>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-30"></div>
                            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        {editingProveedor ? "✏️ Editar Proveedor" : "➕ Nuevo Proveedor"}
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
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-green-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Teléfono</label>
                                        <input
                                            type="text"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-green-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Correo</label>
                                        <input
                                            type="email"
                                            value={formData.correo}
                                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-green-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Dirección</label>
                                        <textarea
                                            value={formData.direccion}
                                            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-green-500 outline-none resize-none"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-6">
                                        <button type="submit" className="flex-1 group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold">
                                                {editingProveedor ? "💾 Actualizar" : "✨ Crear"}
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

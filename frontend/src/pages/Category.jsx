import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { categoriaService } from "../services/senatronics.service";

export default function Category() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategoria, setEditingCategoria] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
            loadCategorias();
        }
    }, [navigate]);

    const loadCategorias = async () => {
        try {
            setLoading(true);
            const data = await categoriaService.getAll();
            setCategorias(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar categorías");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategoria) {
                await categoriaService.update(editingCategoria.id_categoria, formData);
                alert("Categoría actualizada exitosamente");
            } else {
                await categoriaService.create(formData);
                alert("Categoría creada exitosamente");
            }
            setShowModal(false);
            resetForm();
            loadCategorias();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar la categoría");
        }
    };

    const handleEdit = (categoria) => {
        setEditingCategoria(categoria);
        setFormData({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar esta categoría?")) {
            try {
                await categoriaService.delete(id);
                alert("Categoría eliminada exitosamente");
                loadCategorias();
            } catch (error) {
                console.error("Error:", error);
                alert("Error al eliminar la categoría");
            }
        }
    };

    const resetForm = () => {
        setFormData({ nombre: "", descripcion: "" });
        setEditingCategoria(null);
    };

    const categoryIcons = ['📱', '💻', '🎧', '⌚', '📷', '🖥️', '⌨️', '🖱️', '🎮', '📺'];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            📂 Categorías
                        </h1>
                        <p className="text-sm text-gray-400">Gestiona las categorías de productos</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Gestión de Categorías</h2>
                            <p className="text-gray-600">Organiza tus productos por categorías</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                Nueva Categoría
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categorias.map((categoria, index) => (
                                <div
                                    key={categoria.id_categoria}
                                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
                                >
                                    {/* Gradient background effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                                {categoryIcons[index % categoryIcons.length]}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(categoria)}
                                                    className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                                                    title="Editar"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(categoria.id_categoria)}
                                                    className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                                                    title="Eliminar"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {categoria.nombre}
                                        </h3>

                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                            {categoria.descripcion || 'Sin descripción'}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-500">
                                                ID: {categoria.id_categoria}
                                            </span>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {categorias.length === 0 && (
                                <div className="col-span-full flex flex-col items-center justify-center py-20">
                                    <div className="text-6xl mb-4">📂</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay categorías</h3>
                                    <p className="text-gray-500 mb-6">Comienza creando tu primera categoría</p>
                                    <button
                                        onClick={() => { resetForm(); setShowModal(true); }}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        ➕ Crear Primera Categoría
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-[slideIn_0.3s_ease-out]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {editingCategoria ? "✏️ Editar Categoría" : "➕ Nueva Categoría"}
                                </h3>
                                <button
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                        placeholder="Ej: Laptops, Smartphones..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                                        rows="4"
                                        placeholder="Describe esta categoría..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                    >
                                        {editingCategoria ? "💾 Actualizar" : "✨ Crear"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowModal(false); resetForm(); }}
                                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

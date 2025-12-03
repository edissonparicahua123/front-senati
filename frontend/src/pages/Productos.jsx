import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { productoService, proveedorService, almacenService } from "../services/senatronics.service";

export default function Productos() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        marca: "",
        modelo: "",
        categoria: "",
        descripcion: "",
        precio_compra: "",
        precio_venta: "",
        stock_actual: "",
        stock_minimo: "",
        id_proveedor: "",
        id_almacen: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
            loadData();
        }
    }, [navigate]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productosData, proveedoresData, almacenesData] = await Promise.all([
                productoService.getAll(),
                proveedorService.getAll(),
                almacenService.getAll()
            ]);
            setProductos(productosData);
            setProveedores(proveedoresData);
            setAlmacenes(almacenesData);
        } catch (error) {
            console.error("Error cargando datos:", error);
            alert("Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productoService.update(editingProduct.id_producto, formData);
                alert("Producto actualizado exitosamente");
            } else {
                await productoService.create(formData);
                alert("Producto creado exitosamente");
            }
            setShowModal(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar el producto");
        }
    };

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setFormData({
            nombre: producto.nombre,
            marca: producto.marca || "",
            modelo: producto.modelo || "",
            categoria: producto.categoria || "",
            descripcion: producto.descripcion || "",
            precio_compra: producto.precio_compra,
            precio_venta: producto.precio_venta,
            stock_actual: producto.stock_actual,
            stock_minimo: producto.stock_minimo,
            id_proveedor: producto.id_proveedor || "",
            id_almacen: producto.id_almacen || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este producto?")) {
            try {
                await productoService.delete(id);
                alert("Producto eliminado exitosamente");
                loadData();
            } catch (error) {
                console.error("Error:", error);
                alert("Error al eliminar el producto");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            marca: "",
            modelo: "",
            categoria: "",
            descripcion: "",
            precio_compra: "",
            precio_venta: "",
            stock_actual: "",
            stock_minimo: "",
            id_proveedor: "",
            id_almacen: ""
        });
        setEditingProduct(null);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                            📦 Productos
                        </h1>
                        <p className="text-sm text-gray-400">Gestiona tu inventario de productos</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Gestión de Productos</h2>
                            <p className="text-gray-400">{productos.length} productos registrados</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                Nuevo Producto
                            </div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Producto</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Marca/Modelo</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Categoría</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Precio</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Proveedor</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {productos.map((producto) => (
                                                <tr key={producto.id_producto} className="hover:bg-white/5 transition-colors group/row">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-white">{producto.nombre}</div>
                                                        <div className="text-sm text-gray-400">{producto.descripcion?.substring(0, 40)}...</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-300">
                                                        {producto.marca}<br />
                                                        <span className="text-xs text-gray-500">{producto.modelo}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-semibold">
                                                            {producto.categoria}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-green-400">S/ {producto.precio_venta}</div>
                                                        <div className="text-xs text-gray-500">Compra: S/ {producto.precio_compra}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${producto.stock_actual <= producto.stock_minimo
                                                                ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                                                                : 'bg-green-500/20 border border-green-500/30 text-green-400'
                                                            }`}>
                                                            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                                                            {producto.stock_actual}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-400">
                                                        {producto.proveedor?.nombre || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleEdit(producto)}
                                                                className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center transition-colors"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(producto.id_producto)}
                                                                className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg flex items-center justify-center transition-colors"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="relative w-full max-w-3xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>
                            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        {editingProduct ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
                                    </h3>
                                    <button
                                        onClick={() => { setShowModal(false); resetForm(); }}
                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Marca</label>
                                        <input
                                            type="text"
                                            value={formData.marca}
                                            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Modelo</label>
                                        <input
                                            type="text"
                                            value={formData.modelo}
                                            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Categoría</label>
                                        <input
                                            type="text"
                                            value={formData.categoria}
                                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Proveedor</label>
                                        <select
                                            value={formData.id_proveedor}
                                            onChange={(e) => setFormData({ ...formData, id_proveedor: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {proveedores.map(p => (
                                                <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Almacén</label>
                                        <select
                                            value={formData.id_almacen}
                                            onChange={(e) => setFormData({ ...formData, id_almacen: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {almacenes.map(a => (
                                                <option key={a.id_almacen} value={a.id_almacen}>{a.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Precio Compra *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.precio_compra}
                                            onChange={(e) => setFormData({ ...formData, precio_compra: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Precio Venta *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.precio_venta}
                                            onChange={(e) => setFormData({ ...formData, precio_venta: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Stock Actual *</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.stock_actual}
                                            onChange={(e) => setFormData({ ...formData, stock_actual: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Stock Mínimo *</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.stock_minimo}
                                            onChange={(e) => setFormData({ ...formData, stock_minimo: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Descripción</label>
                                        <textarea
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none resize-none"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="col-span-2 flex gap-4 mt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 group relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-xl transform group-hover:scale-105 transition-all">
                                                {editingProduct ? "💾 Actualizar" : "✨ Crear"}
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

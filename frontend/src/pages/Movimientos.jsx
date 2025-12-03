import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { movimientoService, productoService } from "../services/senatronics.service";

export default function Movimientos() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [movimientos, setMovimientos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id_producto: "",
        tipo_movimiento: "",
        cantidad: "",
        usuario_responsable: ""
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
            const [movimientosData, productosData] = await Promise.all([
                movimientoService.getAll(),
                productoService.getAll()
            ]);
            setMovimientos(movimientosData);
            setProductos(productosData);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await movimientoService.create(formData);
            alert("Movimiento registrado exitosamente");
            setShowModal(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al registrar el movimiento");
        }
    };

    const resetForm = () => {
        setFormData({
            id_producto: "",
            tipo_movimiento: "",
            cantidad: "",
            usuario_responsable: userName
        });
    };

    const getTipoColor = (tipo) => {
        switch (tipo) {
            case 'entrada':
                return 'bg-green-500/20 border-green-500/30 text-green-400';
            case 'salida':
                return 'bg-red-500/20 border-red-500/30 text-red-400';
            case 'ajuste':
                return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
        }
    };

    const getTipoIcon = (tipo) => {
        switch (tipo) {
            case 'entrada': return '↑';
            case 'salida': return '↓';
            case 'ajuste': return '⟳';
            default: return '•';
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                            📊 Movimientos
                        </h1>
                        <p className="text-sm text-gray-400">Registra movimientos de inventario</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Historial de Movimientos</h2>
                            <p className="text-gray-400">{movimientos.length} movimientos registrados</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                Nuevo Movimiento
                            </div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Producto</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Cantidad</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Usuario</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {movimientos.map((mov) => (
                                                <tr key={mov.id_movimiento} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-white">{mov.producto?.nombre || 'N/A'}</div>
                                                        <div className="text-sm text-gray-400">{mov.producto?.marca}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-semibold ${getTipoColor(mov.tipo_movimiento)}`}>
                                                            <span className="text-lg">{getTipoIcon(mov.tipo_movimiento)}</span>
                                                            {mov.tipo_movimiento.toUpperCase()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-white font-bold text-lg">{mov.cantidad}</span>
                                                        <span className="text-gray-400 text-sm ml-1">unidades</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-300">
                                                        {mov.usuario_responsable}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-400">
                                                        {new Date(mov.fecha).toLocaleString('es-PE')}
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

                {showModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30"></div>
                            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                        ➕ Nuevo Movimiento
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
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Producto *</label>
                                        <select
                                            required
                                            value={formData.id_producto}
                                            onChange={(e) => setFormData({ ...formData, id_producto: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500 outline-none"
                                        >
                                            <option value="">Seleccionar producto...</option>
                                            {productos.map(p => (
                                                <option key={p.id_producto} value={p.id_producto}>
                                                    {p.nombre} (Stock: {p.stock_actual})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de Movimiento *</label>
                                        <select
                                            required
                                            value={formData.tipo_movimiento}
                                            onChange={(e) => setFormData({ ...formData, tipo_movimiento: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500 outline-none"
                                        >
                                            <option value="">Seleccionar tipo...</option>
                                            <option value="entrada">↑ Entrada</option>
                                            <option value="salida">↓ Salida</option>
                                            <option value="ajuste">⟳ Ajuste</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Cantidad *</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={formData.cantidad}
                                            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500 outline-none"
                                            placeholder="Cantidad de unidades"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Usuario Responsable *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.usuario_responsable || userName}
                                            onChange={(e) => setFormData({ ...formData, usuario_responsable: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-6">
                                        <button type="submit" className="flex-1 group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold">
                                                ✨ Registrar
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { productoService, movimientoService, proveedorService, almacenService } from "../services/senatronics.service";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProductos: 0,
        totalProveedores: 0,
        totalAlmacenes: 0,
        productosLowStock: 0,
        valorInventario: 0,
        movimientosHoy: 0
    });
    const [productos, setProductos] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [categoriaData, setCategoriaData] = useState([]);
    const [movimientosTrend, setMovimientosTrend] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token) {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
            loadDashboardData();
        }
    }, [navigate]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [productosData, movimientosData, proveedoresData, almacenesData] = await Promise.all([
                productoService.getAll(),
                movimientoService.getAll(),
                proveedorService.getAll(),
                almacenService.getAll()
            ]);

            // Calculate stats with robust number parsing
            const lowStock = productosData.filter(p => p.stock_actual <= p.stock_minimo);
            const valorTotal = productosData.reduce((sum, p) => {
                const precio = parseFloat(p.precio_venta) || 0;
                const stock = parseInt(p.stock_actual) || 0;
                return sum + (precio * stock);
            }, 0);

            // Use local date for comparisons to avoid timezone issues
            const getLocalDateStr = (date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-CA'); // YYYY-MM-DD format in local time
            };

            const today = getLocalDateStr(new Date());
            const movimientosHoy = movimientosData.filter(m =>
                getLocalDateStr(m.fecha) === today
            );

            setStats({
                totalProductos: productosData.length,
                totalProveedores: proveedoresData.length,
                totalAlmacenes: almacenesData.length,
                productosLowStock: lowStock.length,
                valorInventario: valorTotal,
                movimientosHoy: movimientosHoy.length
            });

            // Prepare category data for pie chart
            const categorias = {};
            productosData.forEach(p => {
                const cat = p.categoria || 'Sin categoría';
                categorias[cat] = (categorias[cat] || 0) + 1;
            });
            const catData = Object.entries(categorias).map(([name, value]) => ({ name, value }));
            setCategoriaData(catData);

            // Prepare movements trend (last 7 days)
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = getLocalDateStr(date);

                const dayMovs = movimientosData.filter(m =>
                    getLocalDateStr(m.fecha) === dateStr
                );

                last7Days.push({
                    fecha: date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
                    entradas: dayMovs.filter(m => m.tipo_movimiento === 'entrada').length,
                    salidas: dayMovs.filter(m => m.tipo_movimiento === 'salida').length
                });
            }
            setMovimientosTrend(last7Days);

            setProductos(productosData.slice(0, 5)); // Top 5 products
            setMovimientos(movimientosData.slice(0, 5)); // Recent 5 movements
        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <Nav />
            <main className="flex-1 ml-64 relative z-10">
                <header className="h-[70px] bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            📊 Dashboard
                        </h1>
                        <p className="text-sm text-gray-400">Bienvenido, {userName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Última actualización</p>
                            <p className="text-sm font-semibold text-white">{new Date().toLocaleTimeString('es-PE')}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-75 animate-pulse"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>


                {loading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="p-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">📦</span>
                                        <span className="text-3xl font-bold">{stats.totalProductos}</span>
                                    </div>
                                    <p className="text-sm text-blue-100 font-medium">Total Productos</p>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">🏢</span>
                                        <span className="text-3xl font-bold">{stats.totalProveedores}</span>
                                    </div>
                                    <p className="text-sm text-green-100 font-medium">Proveedores</p>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">🏭</span>
                                        <span className="text-3xl font-bold">{stats.totalAlmacenes}</span>
                                    </div>
                                    <p className="text-sm text-purple-100 font-medium">Almacenes</p>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">⚠️</span>
                                        <span className="text-3xl font-bold">{stats.productosLowStock}</span>
                                    </div>
                                    <p className="text-sm text-red-100 font-medium">Stock Bajo</p>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">💰</span>
                                        <span className="text-xl font-bold">S/ {stats.valorInventario.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-yellow-100 font-medium">Valor Inventario</p>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">📊</span>
                                        <span className="text-3xl font-bold">{stats.movimientosHoy}</span>
                                    </div>
                                    <p className="text-sm text-indigo-100 font-medium">Movimientos Hoy</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Movements Trend Chart */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="text-2xl">📈</span>
                                        Movimientos (Últimos 7 días)
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={movimientosTrend}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="fecha" stroke="rgba(255,255,255,0.6)" />
                                            <YAxis stroke="rgba(255,255,255,0.6)" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    borderRadius: '12px',
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="entradas" stroke="#10B981" strokeWidth={3} name="Entradas" dot={{ fill: '#10B981', r: 5 }} />
                                            <Line type="monotone" dataKey="salidas" stroke="#EF4444" strokeWidth={3} name="Salidas" dot={{ fill: '#EF4444', r: 5 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Category Distribution */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="text-2xl">🎯</span>
                                        Distribución por Categoría
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={categoriaData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {categoriaData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top Products */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="text-2xl">🔝</span>
                                        Productos Principales
                                    </h3>
                                    <div className="space-y-3">
                                        {productos.map((producto) => (
                                            <div key={producto.id_producto} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition border border-white/5">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-white">{producto.nombre}</p>
                                                    <p className="text-sm text-gray-400">{producto.marca} - {producto.categoria}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-blue-400">S/ {producto.precio_venta}</p>
                                                    <p className={`text-sm ${producto.stock_actual <= producto.stock_minimo ? 'text-red-400' : 'text-green-400'}`}>
                                                        Stock: {producto.stock_actual}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => navigate('/productos')}
                                        className="w-full mt-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition shadow-lg"
                                    >
                                        Ver Todos los Productos →
                                    </button>
                                </div>
                            </div>

                            {/* Recent Movements */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="text-2xl">🕐</span>
                                        Movimientos Recientes
                                    </h3>
                                    <div className="space-y-3">
                                        {movimientos.map((mov) => (
                                            <div key={mov.id_movimiento} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition border border-white/5">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${mov.tipo_movimiento === 'entrada' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    mov.tipo_movimiento === 'salida' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                    }`}>
                                                    {mov.tipo_movimiento === 'entrada' ? '↑' : mov.tipo_movimiento === 'salida' ? '↓' : '⟳'}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-white">{mov.producto?.nombre || 'N/A'}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(mov.fecha).toLocaleString('es-PE')}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-white">{mov.cantidad} u.</p>
                                                    <p className="text-xs text-gray-400">{mov.usuario_responsable}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => navigate('/movimientos')}
                                        className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition shadow-lg"
                                    >
                                        Ver Todos los Movimientos →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

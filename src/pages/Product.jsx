import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

export default function Product() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [product, setProduct] = useState({
        id_producto: "",
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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");
        if (!token || token !== "123") {
            navigate("/");
        } else {
            setUserName(user || "Usuario");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
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
        if (!product.nombre.trim()) newErrors.nombre = "El nombre es requerido";
        if (!product.marca.trim()) newErrors.marca = "La marca es requerida";
        if (!product.categoria.trim()) newErrors.categoria = "La categoría es requerida";
        if (!product.precio_compra || product.precio_compra <= 0) newErrors.precio_compra = "Precio de compra inválido";
        if (!product.precio_venta || product.precio_venta <= 0) newErrors.precio_venta = "Precio de venta inválido";
        if (!product.stock_actual || product.stock_actual < 0) newErrors.stock_actual = "Stock actual inválido";
        if (!product.stock_minimo || product.stock_minimo < 0) newErrors.stock_minimo = "Stock mínimo inválido";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log("Producto guardado:", product);
        // Aquí iría la lógica para guardar el producto
        alert("Producto guardado exitosamente");
    };

    const handleReset = () => {
        setProduct({
            id_producto: "",
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
        setErrors({});
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Nav />
            <main className="flex-1 ml-64">
                <header className="h-[70px] bg-blue-100 border-b border-blue-200 px-8 flex items-center justify-between">
                    <div className="page-title">
                        <h1 className="m-0 text-2xl text-blue-700 font-bold">Productos</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 bg-blue-50 border-none rounded-full cursor-pointer text-lg flex items-center justify-center hover:bg-white transition-colors">
                            <span>🔔</span>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-1.5 py-0.5 rounded-full font-bold">3</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold cursor-pointer" title={userName}>
                            <span>{userName ? userName.charAt(0).toUpperCase() : "👤"}</span>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="m-0 mb-2 text-3xl text-blue-800 font-bold">Registro de Producto</h2>
                        <p className="m-0 text-gray-600 text-base">Complete el formulario para registrar un nuevo producto</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ID Producto */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="id_producto" className="text-gray-800 text-sm font-medium">ID Producto</label>
                                <input
                                    type="text"
                                    id="id_producto"
                                    name="id_producto"
                                    value={product.id_producto}
                                    onChange={handleChange}
                                    placeholder="Ej: PROD001"
                                    className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                                />
                            </div>

                            {/* Nombre */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nombre" className="text-gray-800 text-sm font-medium">Nombre *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={product.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre del producto"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
                            </div>

                            {/* Marca */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="marca" className="text-gray-800 text-sm font-medium">Marca *</label>
                                <input
                                    type="text"
                                    id="marca"
                                    name="marca"
                                    value={product.marca}
                                    onChange={handleChange}
                                    placeholder="Marca del producto"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.marca ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.marca && <span className="text-red-500 text-xs">{errors.marca}</span>}
                            </div>

                            {/* Modelo */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="modelo" className="text-gray-800 text-sm font-medium">Modelo</label>
                                <input
                                    type="text"
                                    id="modelo"
                                    name="modelo"
                                    value={product.modelo}
                                    onChange={handleChange}
                                    placeholder="Modelo del producto"
                                    className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                                />
                            </div>

                            {/* Categoría */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="categoria" className="text-gray-800 text-sm font-medium">Categoría *</label>
                                <input
                                    type="text"
                                    id="categoria"
                                    name="categoria"
                                    value={product.categoria}
                                    onChange={handleChange}
                                    placeholder="Categoría del producto"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.categoria ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.categoria && <span className="text-red-500 text-xs">{errors.categoria}</span>}
                            </div>

                            {/* Descripción */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label htmlFor="descripcion" className="text-gray-800 text-sm font-medium">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={product.descripcion}
                                    onChange={handleChange}
                                    placeholder="Descripción detallada del producto"
                                    rows="3"
                                    className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white resize-none"
                                />
                            </div>

                            {/* Precio Compra */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="precio_compra" className="text-gray-800 text-sm font-medium">Precio Compra *</label>
                                <input
                                    type="number"
                                    id="precio_compra"
                                    name="precio_compra"
                                    value={product.precio_compra}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.precio_compra ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.precio_compra && <span className="text-red-500 text-xs">{errors.precio_compra}</span>}
                            </div>

                            {/* Precio Venta */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="precio_venta" className="text-gray-800 text-sm font-medium">Precio Venta *</label>
                                <input
                                    type="number"
                                    id="precio_venta"
                                    name="precio_venta"
                                    value={product.precio_venta}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.precio_venta ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.precio_venta && <span className="text-red-500 text-xs">{errors.precio_venta}</span>}
                            </div>

                            {/* Stock Actual */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock_actual" className="text-gray-800 text-sm font-medium">Stock Actual *</label>
                                <input
                                    type="number"
                                    id="stock_actual"
                                    name="stock_actual"
                                    value={product.stock_actual}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.stock_actual ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.stock_actual && <span className="text-red-500 text-xs">{errors.stock_actual}</span>}
                            </div>

                            {/* Stock Mínimo */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock_minimo" className="text-gray-800 text-sm font-medium">Stock Mínimo *</label>
                                <input
                                    type="number"
                                    id="stock_minimo"
                                    name="stock_minimo"
                                    value={product.stock_minimo}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    className={`p-3 border rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white ${errors.stock_minimo ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.stock_minimo && <span className="text-red-500 text-xs">{errors.stock_minimo}</span>}
                            </div>

                            {/* ID Proveedor */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="id_proveedor" className="text-gray-800 text-sm font-medium">ID Proveedor (FK)</label>
                                <input
                                    type="text"
                                    id="id_proveedor"
                                    name="id_proveedor"
                                    value={product.id_proveedor}
                                    onChange={handleChange}
                                    placeholder="Ej: PROV001"
                                    className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                                />
                            </div>

                            {/* ID Almacén */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="id_almacen" className="text-gray-800 text-sm font-medium">ID Almacén (FK)</label>
                                <input
                                    type="text"
                                    id="id_almacen"
                                    name="id_almacen"
                                    value={product.id_almacen}
                                    onChange={handleChange}
                                    placeholder="Ej: ALM001"
                                    className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                                />
                            </div>

                            {/* Botones */}
                            <div className="md:col-span-2 flex gap-4 mt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-700 text-white border-none p-3 rounded-md text-base font-medium cursor-pointer hover:bg-blue-800 transition-colors shadow-sm"
                                >
                                    💾 Guardar Producto
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex-1 bg-gray-500 text-white border-none p-3 rounded-md text-base font-medium cursor-pointer hover:bg-gray-600 transition-colors shadow-sm"
                                >
                                    🔄 Limpiar Formulario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

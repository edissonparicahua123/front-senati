const express = require("express");
const sequelize = require("./settings/db");
const authMiddleware = require("./middleware/authentification");
const cors = require('cors');


// ROUTES
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const proveedorRoutes = require("./routes/proveedor.routes");
const almacenRoutes = require("./routes/almacen.routes");
const productoRoutes = require("./routes/producto.routes");
const movimientoRoutes = require("./routes/movimiento.routes");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Public routes
app.use("/auth", authRoutes);

// SENATRONICS Inventory Routes (Protected with JWT)
app.use("/api/categorias", authMiddleware, categoriaRoutes);
app.use("/api/proveedores", authMiddleware, proveedorRoutes);
app.use("/api/almacenes", authMiddleware, almacenRoutes);
app.use("/api/productos", authMiddleware, productoRoutes);
app.use("/api/movimientos", authMiddleware, movimientoRoutes);

// PROTECTED
app.use("/u", authMiddleware, userRoutes);

sequelize.authenticate()
    .then(() => console.log("✅ Conectado a la DB"))
    .catch(err => console.error("❌ Error ", err));

module.exports = app;
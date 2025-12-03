const { sequelize, Usuario, Categoria, Proveedor, Almacen, Producto, MovimientoInventario } = require("../models");

async function initDatabase() {
    try {
        console.log("🔄 Iniciando conexión a la base de datos...");

        // Test connection
        await sequelize.authenticate();
        console.log("✅ Conexión establecida correctamente");

        // Sync all models (create tables)
        console.log("\n🔄 Creando tablas en la base de datos...");

        // Set force to true to drop existing tables (use with caution!)
        // Set force to false to keep existing data
        await sequelize.sync({ force: false, alter: true });

        console.log("✅ Tablas creadas/actualizadas correctamente");

        // Optional: Seed initial data
        console.log("\n🔄 Verificando datos iniciales...");

        // Check if categories exist
        const categoriaCount = await Categoria.count();
        if (categoriaCount === 0) {
            console.log("📝 Creando categorías iniciales...");
            await Categoria.bulkCreate([
                { nombre: "Laptops", descripcion: "Computadoras portátiles" },
                { nombre: "Smartphones", descripcion: "Teléfonos inteligentes" },
                { nombre: "Tablets", descripcion: "Tabletas electrónicas" },
                { nombre: "Accesorios", descripcion: "Accesorios electrónicos" },
                { nombre: "Componentes", descripcion: "Componentes de computadora" }
            ]);
            console.log("✅ Categorías creadas");
        }

        // Check if warehouses exist
        const almacenCount = await Almacen.count();
        if (almacenCount === 0) {
            console.log("📝 Creando almacén inicial...");
            await Almacen.create({
                nombre: "Almacén Central",
                ubicacion: "Lima, Perú"
            });
            console.log("✅ Almacén creado");
        }

        // Check if suppliers exist
        const proveedorCount = await Proveedor.count();
        if (proveedorCount === 0) {
            console.log("📝 Creando proveedores iniciales...");
            await Proveedor.bulkCreate([
                {
                    nombre: "TechSupply Peru",
                    telefono: "01-234-5678",
                    correo: "ventas@techsupply.pe",
                    direccion: "Av. Tecnología 123, Lima"
                },
                {
                    nombre: "ElectroDistribuidora",
                    telefono: "01-987-6543",
                    correo: "contacto@electrodist.com",
                    direccion: "Jr. Comercio 456, Lima"
                }
            ]);
            console.log("✅ Proveedores creados");
        }

        console.log("\n✅ Base de datos inicializada correctamente");
        console.log("\n📊 Resumen:");
        console.log(`   - Categorías: ${await Categoria.count()}`);
        console.log(`   - Proveedores: ${await Proveedor.count()}`);
        console.log(`   - Almacenes: ${await Almacen.count()}`);
        console.log(`   - Productos: ${await Producto.count()}`);
        console.log(`   - Movimientos: ${await MovimientoInventario.count()}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error al inicializar la base de datos:", error);
        process.exit(1);
    }
}

// Run the initialization
initDatabase();

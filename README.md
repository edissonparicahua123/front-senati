# 🚀 GUÍA DE INICIO RÁPIDO - SENATRONICS

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Iniciar Backend
```bash
cd backend
npm start
```
✅ Servidor corriendo en `http://localhost:3000`

### 2️⃣ Iniciar Frontend  
```bash
cd frontend
npm run dev
```
✅ Aplicación corriendo en `http://localhost:5173`

### 3️⃣ Primera Vez - Inicializar Base de Datos
```bash
cd backend
node src/scripts/init-db.js
```
✅ Crea tablas y datos iniciales

---

## 👤 Acceso al Sistema

### Crear Usuario
1. Ir a `http://localhost:5173/register`
2. Llenar formulario:
   - **Email**: `admin@senatronics.com`
   - **Password**: `admin123`
   - **Nombre**: `Administrador`
   - **Rol**: `admin`
3. Click en "Registrarse"

### Iniciar Sesión
1. Ir a `http://localhost:5173/`
2. Ingresar credenciales
3. Click en "Iniciar Sesión"
4. ✅ Redirige al Dashboard

---

## 📊 Funcionalidades Principales

### Dashboard (Home)
- **Estadísticas en tiempo real**: productos, proveedores, almacenes, stock bajo, valor inventario
- **Gráfico de tendencias**: movimientos de los últimos 7 días
- **Gráfico de categorías**: distribución de productos
- **Productos principales**: top 5 productos
- **Movimientos recientes**: últimos 5 movimientos

### Gestión de Productos
1. Click en "Productos" en el menú
2. Click en "➕ Nuevo Producto"
3. Llenar datos y seleccionar proveedor/almacén
4. Guardar
5. ✅ Producto creado

### Gestión de Proveedores
1. Click en "Proveedores"
2. Click en "➕ Nuevo Proveedor"
3. Ingresar datos de contacto
4. Guardar

### Gestión de Almacenes
1. Click en "Almacenes"
2. Click en "➕ Nuevo Almacén"
3. Ingresar nombre y ubicación
4. Guardar

### Registrar Movimientos
1. Click en "Movimientos"
2. Click en "➕ Nuevo Movimiento"
3. Seleccionar:
   - Producto
   - Tipo (Entrada/Salida/Ajuste)
   - Cantidad
   - Motivo
4. Guardar
5. ✅ Stock actualizado automáticamente

---

## 🔐 Seguridad

✅ **Todas las rutas están protegidas con JWT**
- El token se genera al hacer login
- Se envía automáticamente en cada petición
- Expira en 1 hora

---

## 📝 Datos de Prueba Iniciales

El script `init-db.js` crea:

**Categorías:**
- Laptops
- Smartphones
- Tablets
- Accesorios
- Componentes

**Almacén:**
- Almacén Central (Lima, Perú)

**Proveedores:**
- TechSupply Peru
- ElectroDistribuidora

---

## 🎯 Flujo Recomendado de Prueba

1. ✅ Registrar usuario
2. ✅ Hacer login
3. ✅ Ver dashboard (verás datos iniciales)
4. ✅ Crear un proveedor nuevo
5. ✅ Crear un producto (asignar proveedor y almacén)
6. ✅ Registrar entrada de inventario (20 unidades)
7. ✅ Ver que el stock se actualizó
8. ✅ Registrar salida (5 unidades)
9. ✅ Ver dashboard actualizado con gráficos
10. ✅ Explorar todas las páginas

---

## 🆘 Solución de Problemas

### Backend no inicia
- Verificar que MySQL esté corriendo
- Verificar credenciales en `backend/src/settings/db.js`
- Ejecutar `npm install` en carpeta backend

### Frontend no inicia
- Ejecutar `npm install` en carpeta frontend
- Verificar que puerto 5173 esté libre

### No aparecen datos
- Ejecutar `node src/scripts/init-db.js`
- Verificar conexión a base de datos
- Revisar consola del navegador (F12)

### Error de autenticación
- Borrar localStorage del navegador
- Hacer login nuevamente
- Verificar que backend esté corriendo

---

## 📦 Tecnologías Utilizadas

**Backend:**
- Node.js + Express
- Sequelize ORM
- MySQL
- JWT + Bcrypt
- CORS

**Frontend:**
- React 18
- React Router
- Axios
- TailwindCSS
- Recharts (gráficos)

---

## ✨ Características Destacadas

✅ Dashboard profesional con gráficos interactivos
✅ CRUD completo para todas las entidades
✅ Autenticación JWT segura
✅ Actualización automática de stock
✅ Validaciones en frontend y backend
✅ UI/UX moderna y responsive
✅ Relaciones entre tablas
✅ Historial de movimientos
✅ Reportes y estadísticas

---

## 🎉 ¡Listo para Usar!

El sistema SENATRONICS está completamente funcional y listo para gestionar tu inventario de productos electrónicos.

**¿Necesitas ayuda?** Revisa el archivo `walkthrough.md` para documentación completa.

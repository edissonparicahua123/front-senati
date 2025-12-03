# 🚀 SENATRONICS - Sistema de Gestión de Inventario

**SENATRONICS** es una aplicación web Fullstack moderna y robusta diseñada para la gestión eficiente de inventarios, productos, proveedores y almacenes. Destaca por su interfaz de usuario premium inspirada en macOS, con efectos de glassmorphism, animaciones fluidas y un diseño visualmente impactante.

![SENATRONICS Dashboard](https://via.placeholder.com/800x400?text=SENATRONICS+Dashboard+Preview)

## ✨ Características Principales

*   **🎨 Diseño Premium UI/UX**: Interfaz moderna con modo oscuro, gradientes vibrantes, efectos de desenfoque (glassmorphism) y animaciones interactivas.
*   **📊 Dashboard Interactivo**: Visualización de estadísticas en tiempo real, gráficos de tendencias de movimientos y distribución de categorías.
*   **🔐 Autenticación Segura**: Sistema de login y registro con JWT (JSON Web Tokens) y encriptación de contraseñas.
*   **📦 Gestión de Productos**: CRUD completo de productos con control de stock mínimo y alertas.
*   **🏭 Gestión de Almacenes**: Administración de múltiples ubicaciones de almacenamiento.
*   **🚚 Gestión de Proveedores**: Directorio de proveedores con información de contacto.
*   **🔄 Control de Movimientos**: Registro detallado de entradas, salidas y ajustes de inventario.
*   **📂 Categorización**: Organización de productos por categorías dinámicas.

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **React**: Librería principal para la interfaz de usuario.
*   **Vite**: Build tool para un desarrollo rápido.
*   **TailwindCSS**: Framework de estilos para el diseño moderno y responsivo.
*   **Recharts**: Librería para gráficos y visualización de datos.
*   **Axios**: Cliente HTTP para la comunicación con el backend.
*   **React Router**: Manejo de rutas y navegación.

### Backend
*   **Node.js**: Entorno de ejecución para el servidor.
*   **Express**: Framework web para la API RESTful.
*   **Sequelize**: ORM para la gestión de la base de datos.
*   **MySQL**: Base de datos relacional.
*   **JWT**: Manejo de sesiones y seguridad.

## 🚀 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos
*   Node.js (v14 o superior)
*   MySQL Server en ejecución

### 1. Configuración del Backend

1.  Navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Configura la base de datos en `src/settings/db.js` (por defecto busca una DB llamada `senati-db` en localhost).
4.  Inicializa la base de datos (creación de tablas y datos semilla):
    ```bash
    node src/scripts/init-db.js
    ```
5.  Inicia el servidor de desarrollo:
    ```bash
    npm start
    ```
    *El servidor correrá en `http://localhost:4000`*

### 2. Configuración del Frontend

1.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación:
    ```bash
    npm run dev
    ```
    *La aplicación estará disponible en `http://localhost:5173`*

## 📖 Uso de la Aplicación

1.  **Registro/Login**: Crea una cuenta nueva o inicia sesión.
2.  **Dashboard**: Revisa el resumen general de tu inventario.
3.  **Navegación**: Usa la barra lateral para acceder a Productos, Proveedores, Almacenes y Movimientos.
4.  **Operaciones**:
    *   Usa los botones "Nuevo" para crear registros.
    *   Pasa el mouse sobre las filas de las tablas para ver opciones de edición/eliminación.
    *   Registra entradas o salidas de stock desde la sección de Movimientos.

## 👥 Autor

Desarrollado por **Edisson Paricahua** como parte del proyecto Fullstack SENATI.

---
© 2025 SENATRONICS. Todos los derechos reservados.

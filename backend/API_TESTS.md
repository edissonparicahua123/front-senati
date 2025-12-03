# SENATRONICS API Test Collection

Este archivo contiene ejemplos de peticiones para probar todos los endpoints de la API.

## Autenticación

### Registrar Usuario
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "admin@senatronics.com",
  "password": "admin123",
  "nombres": "Administrador",
  "rol": "admin"
}
```

### Login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@senatronics.com",
  "password": "admin123"
}
```

## Categorías

### Obtener todas las categorías
```http
GET http://localhost:3000/api/categorias
```

### Obtener categoría por ID
```http
GET http://localhost:3000/api/categorias/1
```

### Crear categoría
```http
POST http://localhost:3000/api/categorias
Content-Type: application/json

{
  "nombre": "Monitores",
  "descripcion": "Pantallas y monitores para computadora"
}
```

### Actualizar categoría
```http
PUT http://localhost:3000/api/categorias/1
Content-Type: application/json

{
  "nombre": "Laptops Premium",
  "descripcion": "Computadoras portátiles de alta gama"
}
```

### Eliminar categoría
```http
DELETE http://localhost:3000/api/categorias/1
```

## Proveedores

### Obtener todos los proveedores
```http
GET http://localhost:3000/api/proveedores
```

### Obtener proveedor por ID (con productos)
```http
GET http://localhost:3000/api/proveedores/1
```

### Crear proveedor
```http
POST http://localhost:3000/api/proveedores
Content-Type: application/json

{
  "nombre": "Dell Peru SAC",
  "telefono": "01-555-1234",
  "correo": "ventas@dell.pe",
  "direccion": "Av. Javier Prado 123, San Isidro, Lima"
}
```

### Actualizar proveedor
```http
PUT http://localhost:3000/api/proveedores/1
Content-Type: application/json

{
  "nombre": "Dell Peru SAC",
  "telefono": "01-555-9999",
  "correo": "contacto@dell.pe"
}
```

### Eliminar proveedor
```http
DELETE http://localhost:3000/api/proveedores/1
```

## Almacenes

### Obtener todos los almacenes
```http
GET http://localhost:3000/api/almacenes
```

### Obtener almacén por ID (con productos)
```http
GET http://localhost:3000/api/almacenes/1
```

### Crear almacén
```http
POST http://localhost:3000/api/almacenes
Content-Type: application/json

{
  "nombre": "Almacén Norte",
  "ubicacion": "Los Olivos, Lima"
}
```

### Actualizar almacén
```http
PUT http://localhost:3000/api/almacenes/1
Content-Type: application/json

{
  "nombre": "Almacén Central - Sede Principal",
  "ubicacion": "San Juan de Lurigancho, Lima"
}
```

### Eliminar almacén
```http
DELETE http://localhost:3000/api/almacenes/1
```

## Productos

### Obtener todos los productos
```http
GET http://localhost:3000/api/productos
```

### Obtener productos con stock bajo
```http
GET http://localhost:3000/api/productos/low-stock
```

### Obtener productos por categoría
```http
GET http://localhost:3000/api/productos/categoria/Laptops
```

### Obtener producto por ID
```http
GET http://localhost:3000/api/productos/1
```

### Crear producto
```http
POST http://localhost:3000/api/productos
Content-Type: application/json

{
  "nombre": "Dell Latitude 5420",
  "marca": "Dell",
  "modelo": "Latitude 5420",
  "categoria": "Laptops",
  "descripcion": "Laptop empresarial con Intel Core i5, 8GB RAM, 256GB SSD",
  "precio_compra": 2500.00,
  "precio_venta": 3200.00,
  "stock_actual": 10,
  "stock_minimo": 5,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

### Actualizar producto
```http
PUT http://localhost:3000/api/productos/1
Content-Type: application/json

{
  "precio_venta": 3500.00,
  "stock_minimo": 3
}
```

### Actualizar stock de producto
```http
PATCH http://localhost:3000/api/productos/1/stock
Content-Type: application/json

{
  "cantidad": 20,
  "tipo_movimiento": "entrada",
  "usuario_responsable": "admin@senatronics.com",
  "motivo": "Compra de inventario"
}
```

### Eliminar producto
```http
DELETE http://localhost:3000/api/productos/1
```

## Movimientos de Inventario

### Obtener todos los movimientos
```http
GET http://localhost:3000/api/movimientos
```

### Obtener movimientos por producto
```http
GET http://localhost:3000/api/movimientos/producto/1
```

### Obtener movimientos por rango de fechas
```http
GET http://localhost:3000/api/movimientos/date-range?fecha_inicio=2024-01-01&fecha_fin=2024-12-31
```

### Obtener reporte de movimientos
```http
GET http://localhost:3000/api/movimientos/report?tipo_movimiento=entrada
```

### Crear movimiento (Entrada)
```http
POST http://localhost:3000/api/movimientos
Content-Type: application/json

{
  "id_producto": 1,
  "tipo_movimiento": "entrada",
  "cantidad": 50,
  "usuario_responsable": "admin@senatronics.com",
  "motivo": "Compra de inventario nuevo"
}
```

### Crear movimiento (Salida)
```http
POST http://localhost:3000/api/movimientos
Content-Type: application/json

{
  "id_producto": 1,
  "tipo_movimiento": "salida",
  "cantidad": 5,
  "usuario_responsable": "admin@senatronics.com",
  "motivo": "Venta a cliente"
}
```

### Crear movimiento (Ajuste)
```http
POST http://localhost:3000/api/movimientos
Content-Type: application/json

{
  "id_producto": 1,
  "tipo_movimiento": "ajuste",
  "cantidad": 100,
  "usuario_responsable": "admin@senatronics.com",
  "motivo": "Ajuste de inventario físico"
}
```

## Flujo de Prueba Completo

1. **Registrar usuario y hacer login**
2. **Crear categorías** (Laptops, Smartphones, etc.)
3. **Crear proveedores** (Dell, HP, Samsung, etc.)
4. **Crear almacenes** (Almacén Central, etc.)
5. **Crear productos** con referencias a proveedor y almacén
6. **Crear movimiento de entrada** para agregar stock
7. **Verificar que el stock se actualizó** en el producto
8. **Crear movimiento de salida** para reducir stock
9. **Consultar productos con stock bajo**
10. **Generar reporte de movimientos**

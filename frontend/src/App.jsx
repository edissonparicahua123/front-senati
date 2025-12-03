import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Productos from './pages/Productos';
import Proveedores from './pages/Proveedores';
import Almacenes from './pages/Almacenes';
import Movimientos from './pages/Movimientos';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />

        {/* SENATRONICS Routes */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/almacenes" element={<Almacenes />} />
        <Route path="/movimientos" element={<Movimientos />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

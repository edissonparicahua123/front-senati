import api from './api';

// ==================== AUTHENTICATION ====================
export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

// ==================== CATEGORÍAS ====================
export const categoriaService = {
    getAll: async () => {
        const response = await api.get('/api/categorias');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/categorias/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/api/categorias', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/api/categorias/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/categorias/${id}`);
        return response.data;
    }
};

// ==================== PROVEEDORES ====================
export const proveedorService = {
    getAll: async () => {
        const response = await api.get('/api/proveedores');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/proveedores/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/api/proveedores', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/api/proveedores/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/proveedores/${id}`);
        return response.data;
    }
};

// ==================== ALMACENES ====================
export const almacenService = {
    getAll: async () => {
        const response = await api.get('/api/almacenes');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/almacenes/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/api/almacenes', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/api/almacenes/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/almacenes/${id}`);
        return response.data;
    }
};

// ==================== PRODUCTOS ====================
export const productoService = {
    getAll: async () => {
        const response = await api.get('/api/productos');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/productos/${id}`);
        return response.data;
    },

    getLowStock: async () => {
        const response = await api.get('/api/productos/low-stock');
        return response.data;
    },

    getByCategory: async (categoria) => {
        const response = await api.get(`/api/productos/categoria/${categoria}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/api/productos', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/api/productos/${id}`, data);
        return response.data;
    },

    updateStock: async (id, data) => {
        const response = await api.patch(`/api/productos/${id}/stock`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/productos/${id}`);
        return response.data;
    }
};

// ==================== MOVIMIENTOS ====================
export const movimientoService = {
    getAll: async () => {
        const response = await api.get('/api/movimientos');
        return response.data;
    },

    getByProduct: async (id) => {
        const response = await api.get(`/api/movimientos/producto/${id}`);
        return response.data;
    },

    getByDateRange: async (fecha_inicio, fecha_fin) => {
        const response = await api.get('/api/movimientos/date-range', {
            params: { fecha_inicio, fecha_fin }
        });
        return response.data;
    },

    getReport: async (filters = {}) => {
        const response = await api.get('/api/movimientos/report', {
            params: filters
        });
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/api/movimientos', data);
        return response.data;
    }
};

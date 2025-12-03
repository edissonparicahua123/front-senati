const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Servidor SENATRONICS corriendo en http://localhost:${port}`);
    console.log(`📊 API disponible en http://localhost:${port}/api`);
});
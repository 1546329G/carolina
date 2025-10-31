const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // logger HTTP
const app = express();

// Importar rutas
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // log de todas las peticiones

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);

// Ruta principal de prueba
app.get('/', (req, res) => {
  console.log('--- PETICIÓN A / ---');
  res.send('API Botica Sanifarma funcionando ✅');
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  console.log('--- RUTA NO ENCONTRADA:', req.originalUrl);
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error('--- ERROR:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

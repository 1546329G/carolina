const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const auth = require('../middleware/auth');

// Obtener todos los productos
router.get('/', productosController.getAll);

// Obtener producto por ID
router.get('/:id', productosController.getById);

// Crear producto (requiere autenticación)
router.post('/', auth, productosController.create);

// Actualizar producto (requiere autenticación)
router.put('/:id', auth, productosController.update);

// Eliminar producto (requiere autenticación)
router.delete('/:id', auth, productosController.delete);

module.exports = router;

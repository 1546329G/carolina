const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tu_clave_secreta_aqui'; // cambiar en producción

// Registro (opcional)
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO usuarios (nombre,email,password) VALUES (?,?,?)', [nombre,email,hashedPassword]);
        res.json({ message: 'Usuario creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email=?', [email]);
        if(rows.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, nombre: user.nombre, rol: user.rol }, JWT_SECRET, { expiresIn: '8h' });
        res.json({ token, nombre: user.nombre, rol: user.rol });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

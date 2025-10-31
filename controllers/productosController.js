const pool = require('../db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if(rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock]
        );
        res.status(201).json({ id: result.insertId, nombre, descripcion, precio, stock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?',
            [nombre, descripcion, precio, stock, req.params.id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await pool.query('DELETE FROM productos WHERE id=?', [req.params.id]);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

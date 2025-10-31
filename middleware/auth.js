const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta_aqui';

function authMiddleware(req, res, next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message: 'No token provided' });

    try{
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = authMiddleware;

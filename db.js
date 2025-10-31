const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'srv805.hstgr.io',           // También puedes usar '45.152.46.204'
  user: 'u666383048_botica_sanifar',          
  password: 'hG2@@34vQsD',        
  database: 'u666383048_botica_sanifar', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

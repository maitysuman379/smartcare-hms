
const mysql = require("mysql2/promise");

const sslCA = process.env.DB_SSL_CA;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),

  ssl: {
    ca: sslCA ? sslCA.replace(/\\n/g, "\n") : undefined,
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

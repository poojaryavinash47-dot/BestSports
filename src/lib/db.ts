import mysql from "mysql2/promise";

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'u684770053_admin',
  DB_PASSWORD,
  DB_NAME = 'u684770053_bestsportsdb',
} = process.env;


const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
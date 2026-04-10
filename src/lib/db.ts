import mysql from "mysql2/promise";
import { config } from "./dbconfig";

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 3306,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
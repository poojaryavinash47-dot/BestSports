import pool from './db';
import crypto from 'crypto';

let initialized = false;
let initPromise: Promise<void> | null = null;

async function ensureTables(conn: any) {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS subscription_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        batch VARCHAR(100),
        start_date VARCHAR(50),
        notes TEXT,
        plan_name VARCHAR(255),
        plan_price VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  await conn.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      ran_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(512) NOT NULL,
      password_salt VARCHAR(128),
      name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Example additional table; adjust as needed
  await conn.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(50) PRIMARY KEY,
      sport VARCHAR(50),
      venue VARCHAR(255),
      date VARCHAR(50),
      time VARCHAR(50),
      status VARCHAR(50)
    ) ENGINE=InnoDB;
  `);
  await conn.query(`
    CREATE TABLE IF NOT EXISTS membership_bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255),
      phone VARCHAR(50),
      email VARCHAR(255),
      start_date VARCHAR(50),
      notes TEXT,
      plan_name VARCHAR(255),
      plan_price VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
}

export default async function initDb() {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    let conn: any;
    try {
      conn = await pool.getConnection();
    } catch (err) {
      console.error('DB init skipped: cannot get DB connection (will retry on next start):', err && (err as any).code ? (err as any).code : err);
      // Do not throw here; allow application to start without DB. Init will be attempted again on next process start.
      return;
    }

    try {
      await ensureTables(conn);

      const [mrows] = await conn.query('SELECT name FROM migrations WHERE name = ?', ['init_v1']);
      if ((mrows as any[]).length > 0) {
        initialized = true;
        return;
      }

      // Seed admin from env vars if provided
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName = process.env.ADMIN_NAME || 'Admin';

      if (adminEmail && adminPassword) {
        const [exists] = await conn.query('SELECT id FROM admins WHERE email = ?', [adminEmail]);
        if ((exists as any[]).length === 0) {
          const salt = crypto.randomBytes(16).toString('hex');
          const hash = crypto.pbkdf2Sync(adminPassword, salt, 100000, 64, 'sha512').toString('hex');
          await conn.query('INSERT INTO admins (email, password_hash, password_salt, name) VALUES (?, ?, ?, ?)', [adminEmail, hash, salt, adminName]);
        }
      }

      // mark migration as run
      await conn.query('INSERT INTO migrations (name) VALUES (?)', ['init_v1']);

      initialized = true;
    } catch (err) {
      console.error('DB init failed:', err);
    } finally {
      try { conn?.release(); } catch (_) {}
    }
  })();

  return initPromise;
}

// Run on import (server-side) to ensure it runs once per process
initDb().catch((err) => {
  console.error('Error running DB init:', err);
});

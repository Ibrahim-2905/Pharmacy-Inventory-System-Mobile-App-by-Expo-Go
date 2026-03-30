import * as SQLite from 'expo-sqlite';

let db;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('pharmacy.db');
    await db.execAsync('PRAGMA journal_mode = WAL;');
  }
  return db;
};

export const initDB = async () => {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS medicines (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      qty         INTEGER NOT NULL DEFAULT 0,
      buy_price   REAL    NOT NULL,
      sell_price  REAL    NOT NULL,
      created_at  TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sales (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_no      TEXT    NOT NULL,
      total        REAL    NOT NULL,
      discount_pct REAL    DEFAULT 0,
      discount_amt REAL    DEFAULT 0,
      subtotal     REAL    NOT NULL,
      created_at   TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sale_items (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id      INTEGER NOT NULL,
      medicine_id  INTEGER NOT NULL,
      medicine_name TEXT   NOT NULL,
      qty          INTEGER NOT NULL,
      sell_price   REAL    NOT NULL,
      buy_price    REAL    NOT NULL,
      FOREIGN KEY (sale_id) REFERENCES sales(id)
    );
  `);

  console.log('DB initialized');
};
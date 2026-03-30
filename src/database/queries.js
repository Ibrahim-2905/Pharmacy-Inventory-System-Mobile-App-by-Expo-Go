import { Platform } from 'react-native';
import { getDB } from './db';

// ─────────────────────────────────────────────
// MEDICINES
// ─────────────────────────────────────────────

export const getAllMedicines = async () => {
  const db = await getDB();
  return await db.getAllAsync('SELECT * FROM medicines ORDER BY name ASC');
};

export const deleteAllData = async () => {
  const db = await getDB();
  await db.execAsync(`DELETE FROM sale_items;`);
  await db.execAsync(`DELETE FROM sales;`);
  await db.execAsync(`DELETE FROM medicines;`);
};;

export const searchMedicines = async (query) => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT * FROM medicines WHERE name LIKE ? ORDER BY name ASC',
    [`%${query}%`]
  );
};

export const getMedicineById = async (id) => {
  const db = await getDB();
  return await db.getFirstAsync('SELECT * FROM medicines WHERE id = ?', [id]);
};

export const addMedicine = async ({ name, qty, buy_price, sell_price }) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO medicines (name, qty, buy_price, sell_price) VALUES (?, ?, ?, ?)',
    [name, qty, buy_price, sell_price]
  );
  return result.lastInsertRowId;
};

export const updateMedicine = async ({ id, name, qty, buy_price, sell_price }) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE medicines SET name = ?, qty = ?, buy_price = ?, sell_price = ? WHERE id = ?',
    [name, qty, buy_price, sell_price, id]
  );
};

export const deleteMedicine = async (id) => {
  const db = await getDB();
  await db.runAsync('DELETE FROM medicines WHERE id = ?', [id]);
};

export const reduceStock = async (id, qtySold) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE medicines SET qty = qty - ? WHERE id = ?',
    [qtySold, id]
  );
};

export const getLowStock = async () => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT * FROM medicines WHERE qty <= 10 ORDER BY qty ASC'
  );
};

// ─────────────────────────────────────────────
// SALES
// ─────────────────────────────────────────────

export const confirmSale = async ({ cart, subtotal, discountPct, discountAmt, total }) => {
  const db = await getDB();
  const billNo = `BILL-${Date.now()}`;

  const runSale = async () => {

    // ── Step 1: verify stock for every item BEFORE touching DB ──
    for (const item of cart) {
      const row = await db.getFirstAsync(
        'SELECT qty FROM medicines WHERE id = ?',
        [item.id]
      );
      if (!row) {
        throw new Error(`Medicine not found: ${item.name}`);
      }
      if (row.qty < item.qty) {
        throw new Error(
          `Not enough stock for ${item.name}. Available: ${row.qty}, requested: ${item.qty}`
        );
      }
    }

    // ── Step 2: insert sale record ──
    const saleResult = await db.runAsync(
      `INSERT INTO sales (bill_no, total, discount_pct, discount_amt, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [billNo, total, discountPct, discountAmt, subtotal]
    );
    const saleId = saleResult.lastInsertRowId;

    // ── Step 3: insert items + deduct stock ──
    for (const item of cart) {
      await db.runAsync(
        `INSERT INTO sale_items
         (sale_id, medicine_id, medicine_name, qty, sell_price, buy_price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [saleId, item.id, item.name, item.qty, item.sell_price, item.buy_price || 0]
      );
      // MAX(0, qty - ?) ensures stock never goes negative even if something slips through
      await db.runAsync(
        'UPDATE medicines SET qty = MAX(0, qty - ?) WHERE id = ?',
        [item.qty, item.id]
      );
    }
  };

  if (Platform.OS !== 'web') {
    await db.withTransactionAsync(runSale);
  } else {
    await runSale();
  }

  return billNo;
};

export const getAllSales = async () => {
  const db = await getDB();
  return await db.getAllAsync('SELECT * FROM sales ORDER BY created_at DESC');
};

export const getTodaySales = async () => {
  const db = await getDB();
  return await db.getAllAsync(
    `SELECT * FROM sales
     WHERE date(created_at) = date('now')
     ORDER BY created_at DESC`
  );
};

export const getTodayTotal = async () => {
  const db = await getDB();
  const result = await db.getFirstAsync(
    `SELECT
       COALESCE(SUM(total), 0)     AS total_sales,
       COALESCE(SUM(subtotal), 0)  AS subtotal,
       COUNT(*)                    AS bill_count
     FROM sales
     WHERE date(created_at) = date('now')`
  );
  return result;
};

export const getMonthTotal = async () => {
  const db = await getDB();
  const result = await db.getFirstAsync(
    `SELECT
       COALESCE(SUM(total), 0)    AS total_sales,
       COUNT(*)                   AS bill_count
     FROM sales
     WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`
  );
  return result;
};

// ─────────────────────────────────────────────
// PROFIT & LOSS
// ─────────────────────────────────────────────

export const getTodayProfit = async () => {
  const db = await getDB();
  const result = await db.getFirstAsync(
    `SELECT
       COALESCE(SUM((si.sell_price - si.buy_price) * si.qty), 0) AS profit
     FROM sale_items si
     JOIN sales s ON si.sale_id = s.id
     WHERE date(s.created_at) = date('now')`
  );
  return result?.profit || 0;
};

export const getMonthProfit = async () => {
  const db = await getDB();
  const result = await db.getFirstAsync(
    `SELECT
       COALESCE(SUM((si.sell_price - si.buy_price) * si.qty), 0) AS profit
     FROM sale_items si
     JOIN sales s ON si.sale_id = s.id
     WHERE strftime('%Y-%m', s.created_at) = strftime('%Y-%m', 'now')`
  );
  return result?.profit || 0;
};

export const getProfitPerMedicine = async () => {
  const db = await getDB();
  return await db.getAllAsync(
    `SELECT
       si.medicine_name                                        AS name,
       SUM(si.qty)                                            AS total_sold,
       SUM((si.sell_price - si.buy_price) * si.qty)          AS profit
     FROM sale_items si
     JOIN sales s ON si.sale_id = s.id
     WHERE strftime('%Y-%m', s.created_at) = strftime('%Y-%m', 'now')
     GROUP BY si.medicine_name
     ORDER BY profit DESC`
  );
};

// ─────────────────────────────────────────────
// BACKUP / EXPORT
// ─────────────────────────────────────────────

export const exportAllData = async () => {
  const db = await getDB();
  const medicines  = await db.getAllAsync('SELECT * FROM medicines');
  const sales      = await db.getAllAsync('SELECT * FROM sales');
  const saleItems  = await db.getAllAsync('SELECT * FROM sale_items');
  return JSON.stringify({ medicines, sales, saleItems, exportedAt: new Date().toISOString() });
};

export const importAllData = async (jsonString) => {
  const db   = await getDB();
  const data = JSON.parse(jsonString);

  const runImport = async () => {
    await db.execAsync('DELETE FROM sale_items;');
    await db.execAsync('DELETE FROM sales;');
    await db.execAsync('DELETE FROM medicines;');

    for (const m of data.medicines) {
      await db.runAsync(
        'INSERT INTO medicines (id, name, qty, buy_price, sell_price, created_at) VALUES (?,?,?,?,?,?)',
        [m.id, m.name, m.qty, m.buy_price, m.sell_price, m.created_at]
      );
    }
    for (const s of data.sales) {
      await db.runAsync(
        'INSERT INTO sales (id, bill_no, total, discount_pct, discount_amt, subtotal, created_at) VALUES (?,?,?,?,?,?,?)',
        [s.id, s.bill_no, s.total, s.discount_pct, s.discount_amt, s.subtotal, s.created_at]
      );
    }
    for (const si of data.saleItems) {
      await db.runAsync(
        'INSERT INTO sale_items (id, sale_id, medicine_id, medicine_name, qty, sell_price, buy_price) VALUES (?,?,?,?,?,?,?)',
        [si.id, si.sale_id, si.medicine_id, si.medicine_name, si.qty, si.sell_price, si.buy_price]
      );
    }
  };

  

  if (Platform.OS !== 'web') {
    await db.withTransactionAsync(runImport);
  } else {
    await runImport();
  }
};
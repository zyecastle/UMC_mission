import { pool } from "../db.config.js";
import prisma from "../db.config.js";

export const insertStore = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO store (name, description, region_id, food_category_id, address, phone_number)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.description,
        data.regionId,
        data.foodCategoryId,
        data.address,
        data.phoneNumber,
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};
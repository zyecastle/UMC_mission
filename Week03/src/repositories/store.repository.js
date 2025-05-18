const db = require('../../db.config');

class StoreRepository {
  async create(storeData, regionId) {
    try {
      const [result] = await db.query(
        'INSERT INTO stores (name, address, description, region_id) VALUES (?, ?, ?, ?)',
        [storeData.name, storeData.address, storeData.description, regionId]
      );

      const [stores] = await db.query('SELECT * FROM stores WHERE id = ?', [result.insertId]);
      return stores[0];
    } catch (error) {
      throw new Error(`Failed to create store: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const [stores] = await db.query('SELECT * FROM stores WHERE id = ?', [id]);
      return stores.length > 0 ? stores[0] : null;
    } catch (error) {
      throw new Error(`Failed to find store by id: ${error.message}`);
    }
  }
}

module.exports = new StoreRepository();
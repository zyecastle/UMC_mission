
const db = require('../../db.config');

class RegionRepository {
  async findById(id) {
    try {
      const [regions] = await db.query('SELECT * FROM regions WHERE id = ?', [id]);
      return regions.length > 0 ? regions[0] : null;
    } catch (error) {
      throw new Error(`Failed to find region by id: ${error.message}`);
    }
  }
}

module.exports = new RegionRepository();
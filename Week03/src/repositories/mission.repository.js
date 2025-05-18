const db = require('../../db.config');

class MissionRepository {
  async create(missionData, storeId) {
    try {
      const [result] = await db.query(
        'INSERT INTO missions (title, description, reward, store_id) VALUES (?, ?, ?, ?)',
        [missionData.title, missionData.description, missionData.reward, storeId]
      );

      const [missions] = await db.query('SELECT * FROM missions WHERE id = ?', [result.insertId]);
      return missions[0];
    } catch (error) {
      throw new Error(`Failed to create mission: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const [missions] = await db.query('SELECT * FROM missions WHERE id = ?', [id]);
      return missions.length > 0 ? missions[0] : null;
    } catch (error) {
      throw new Error(`Failed to find mission by id: ${error.message}`);
    }
  }
}

module.exports = new MissionRepository();
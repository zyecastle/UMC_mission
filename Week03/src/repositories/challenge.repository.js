const db = require('../../db.config');

class ChallengeRepository {
  async create(missionId, userId) {
    try {
      const [result] = await db.query(
        'INSERT INTO challenges (mission_id, user_id, status) VALUES (?, ?, ?)',
        [missionId, userId, 'in_progress']
      );

      const [challenges] = await db.query('SELECT * FROM challenges WHERE id = ?', [result.insertId]);
      return challenges[0];
    } catch (error) {
      throw new Error(`Failed to create challenge: ${error.message}`);
    }
  }

  async findActiveChallengeByMissionAndUser(missionId, userId) {
    try {
      const [challenges] = await db.query(
        'SELECT * FROM challenges WHERE mission_id = ? AND user_id = ? AND status = ?',
        [missionId, userId, 'in_progress']
      );
      return challenges.length > 0 ? challenges[0] : null;
    } catch (error) {
      throw new Error(`Failed to find active challenge: ${error.message}`);
    }
  }
}

module.exports = new ChallengeRepository();
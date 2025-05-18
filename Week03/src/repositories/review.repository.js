const db = require('../../db.config');

class ReviewRepository {
  async create(reviewData, storeId, userId) {
    try {
      const [result] = await db.query(
        'INSERT INTO reviews (content, rating, store_id, user_id) VALUES (?, ?, ?, ?)',
        [reviewData.content, reviewData.rating, storeId, userId]
      );

      const [reviews] = await db.query('SELECT * FROM reviews WHERE id = ?', [result.insertId]);
      return reviews[0];
    } catch (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }
  }
}

module.exports = new ReviewRepository();
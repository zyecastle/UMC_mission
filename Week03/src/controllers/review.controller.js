const reviewService = require('../services/review.service');
const ReviewDto = require('../dtos/review.dto');

class ReviewController {
  async createReview(req, res) {
    try {
      const storeId = parseInt(req.params.storeId);
      const reviewData = ReviewDto.fromRequest(req.body);

      // 필수 필드 검증
      if (!reviewData.content || reviewData.rating === undefined) {
        return res.status(400).json({ error: 'Content and rating are required' });
      }

      const createdReview = await reviewService.createReview(reviewData, storeId);
      
      return res.status(201).json({
        message: 'Review added successfully',
        review: createdReview
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('must be between')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: `Failed to create review: ${error.message}` });
    }
  }
}

module.exports = new ReviewController();
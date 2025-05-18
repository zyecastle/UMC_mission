class ReviewDto {
    constructor(data) {
      this.id = data.id;
      this.content = data.content;
      this.rating = data.rating;
      this.storeId = data.store_id;
      this.userId = data.user_id;
      this.createdAt = data.created_at;
    }
  
    static fromRequest(body) {
      return {
        content: body.content,
        rating: body.rating,
      };
    }
  }
  
  module.exports = ReviewDto;
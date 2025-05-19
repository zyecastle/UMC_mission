import {
    checkStoreExists,
    insertReview,
    insertReviewImages,
    getUserReviews
  } from "../repositories/review.repository.js";
  import { ReviewStoreNotFoundError } from "../errors.js";
  import { createReviewWithImages } from "../repositories/review.repository.js";
  
  export const createReviewService = async (storeId, data) => {
    const result = await createReviewWithImages(storeId, data);
  
    if (!result) {
      throw new ReviewStoreNotFoundError("해당 가게에 리뷰를 등록할 수 없습니다.", { storeId });
    }
  
    return { reviewId: result.id };
  };
  
  export const listUserReviews = async (userId, cursor) => {
    const reviews = await getUserReviews(userId, cursor);
  
    return {
      reviews: reviews.map(r => ({
        reviewId: r.id,
        store: r.store,
        rating: Number(r.rating),
        content: r.content,
        images: r.images.map(img => img.imageUrl),
        createdAt: r.createdAt.toISOString().split("T")[0]
      })),
      nextCursor: reviews.length === 5 ? reviews[4].id : null
    };
  };
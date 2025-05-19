import { createReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";
import { listUserReviews } from "../services/review.service.js";

export const createReview = async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
  
    try {
      const result = await createReviewService(storeId, req.body);
      return res.success(result);
    } catch (err) {
      next(err);
    }
  };

export const handleListUserReviews = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : undefined;
  
    try {
      const { reviews, nextCursor } = await listUserReviews(userId, cursor);
      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "작성한 리뷰 목록 조회 성공",
        result: reviews,
        nextCursor
      });
    } catch (err) {
      res.status(500).json({
        isSuccess: false,
        code: 500,
        message: "서버 오류",
        result: null
      });
    }
  };
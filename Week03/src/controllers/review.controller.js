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
    /*
  #swagger.summary = '상점 리뷰 작성 API'
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '리뷰를 작성할 상점 ID',
    required: true,
    type: 'integer'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            userId: { type: 'integer', example: 1 },
            content: { type: 'string', example: '정말 좋은 카페예요!' },
            rating: { type: 'integer', example: 5 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '상점 리뷰 작성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: { type: 'object' }
          }
        }
      }
    }
  }
*/
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
    /*
  #swagger.summary = '유저 리뷰 목록 조회 API'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '리뷰를 조회할 유저 ID',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '페이지네이션용 커서 (선택)',
    required: false,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: '작성한 리뷰 목록 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: true },
            code: { type: 'number', example: 200 },
            message: { type: 'string', example: '작성한 리뷰 목록 조회 성공' },
            result: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  content: { type: 'string' },
                  rating: { type: 'integer' },
                  store: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' }
                    }
                  }
                }
              }
            },
            nextCursor: { type: 'integer', nullable: true, example: 102 }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: false },
            code: { type: 'number', example: 500 },
            message: { type: 'string', example: '서버 오류' },
            result: { type: 'null', example: null }
          }
        }
      }
    }
  }
*/
  };
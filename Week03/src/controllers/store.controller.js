import { createStoreService } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";
import {listStoreReviews} from "../services/store.service.js";

export const createStore = async (req, res, next) => {
    try {
      const result = await createStoreService(req.body);
      return res.success(result);
    } catch (err) {
      next(err);
    }
    /*
  #swagger.summary = '상점 생성 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: '카페 덕성' },
            category: { type: 'string', example: '카페' },
            address: { type: 'string', example: '서울시 도봉구 덕성로 100' },
            phone: { type: 'string', example: '02-123-4567' }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '상점 생성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: '카페 덕성' },
                category: { type: 'string', example: '카페' },
                address: { type: 'string', example: '서울시 도봉구 덕성로 100' },
                phone: { type: 'string', example: '02-123-4567' }
              }
            }
          }
        }
      }
    }
  }
*/
  };

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
      );
    res.status(StatusCodes.OK).json(reviews);
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  };
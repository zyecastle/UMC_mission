import { createMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { challengeMissionService } from "../services/mission.service.js";
import { listStoreMissions } from "../services/mission.service.js";

export const createMission = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId);

  try {
    const result = await createMissionService(storeId, req.body);
    return res.success(result);
  } catch (err) {
    next(err);
  }
  /*
  #swagger.summary = '미션 생성 API'
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '미션을 생성할 상점 ID',
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
            title: { type: 'string', example: '첫 번째 미션' },
            description: { type: 'string', example: '상점에 방문해서 사진 찍기' },
            point: { type: 'integer', example: 100 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '미션 생성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: { type: 'object' } // 실제 응답 구조에 맞춰 세부 필드 추가 가능
          }
        }
      }
    }
  }
*/
};

export const challengeMission = async (req, res, next) => {
  const missionId = parseInt(req.params.missionId);
  const userId = req.body.userId; // 나중에 인증 붙이면 토큰에서 가져올 수 있음

  try {
    const result = await challengeMissionService(missionId, userId);
    console.log("리턴값 확인:",result);
    return res.success(result);
  } catch (err) {
    next(err);
  }
  /*
  #swagger.summary = '미션 도전 API'
  #swagger.parameters['missionId'] = {
    in: 'path',
    description: '도전할 미션 ID',
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
            userId: { type: 'integer', example: 1 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '미션 도전 성공',
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

export const handleListStoreMissions = async (req, res) => {
    const storeId = parseInt(req.params.storeId);
  
    try {
      const missions = await listStoreMissions(storeId);
      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "가게 미션 목록 조회 성공",
        result: missions
      });
    } catch (err) {
      res.status(400).json({
        isSuccess: false,
        code: 400,
        message: err.message,
        result: null
      });
    }
    /*
  #swagger.summary = '가게 미션 목록 조회 API'
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '가게 ID',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: '가게 미션 목록 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: true },
            code: { type: 'number', example: 200 },
            message: { type: 'string', example: '가게 미션 목록 조회 성공' },
            result: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  point: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: '가게 미션 목록 조회 실패',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: false },
            code: { type: 'number', example: 400 },
            message: { type: 'string', example: '유효하지 않은 요청입니다.' },
            result: { type: 'null', example: null }
          }
        }
      }
    }
  }
*/
  };
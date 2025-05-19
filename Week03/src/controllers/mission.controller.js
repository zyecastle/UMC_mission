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
  };
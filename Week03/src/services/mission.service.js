import {
    isAlreadyChallenged,
    insertMission
  } from "../repositories/mission.repository.js";
  import {
    checkMissionExists,
    checkAlreadyChallenged,
    insertUserMission
  } from "../repositories/userMission.repository.js";

import { getMissionsByStoreId } from "../repositories/mission.repository.js";
import { StoreNotFoundError } from "../errors.js";
import { DuplicateMissionChallengeError } from "../errors.js";

export const createMissionService = async (storeId, data) => {
  const mission = await insertMission(storeId, data);

  if (!mission) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  }

  return { missionId: mission.id };
};

export const challengeMissionService = async (missionId, userId) => {
  const already = await isAlreadyChallenged(userId, missionId);

  if (already) {
    throw new DuplicateMissionChallengeError("이미 도전 중인 미션입니다.", {
      userId,
      missionId,
    });
  }

  const userMission = await insertUserMission(userId, missionId);

  return { userMissionId: userMission.id };
};

  export const listStoreMissions = async (storeId) => {
    const missions = await getMissionsByStoreId(storeId);
    return missions.map((m) => ({
      missionId: m.id,
      content: m.content,
      point: m.point,
      isActive: m.isActive,
      createdAt: m.createdAt.toISOString().split("T")[0]
    }));
  };
  

  
const missionRepository = require('../repositories/mission.repository');
const storeRepository = require('../repositories/store.repository');
const MissionDto = require('../dtos/mission.dto');

class MissionService {
  async createMission(missionData, storeId) {
    // 가게 존재 여부 확인
    const store = await storeRepository.findById(storeId);
    if (!store) {
      throw new Error(`Store with id ${storeId} not found`);
    }

    // 미션 생성
    const createdMission = await missionRepository.create(missionData, storeId);
    return new MissionDto(createdMission);
  }
}

module.exports = new MissionService();
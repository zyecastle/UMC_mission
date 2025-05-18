const challengeRepository = require('../repositories/challenge.repository');
const missionRepository = require('../repositories/mission.repository');
const userRepository = require('../repositories/user.repository');
const ChallengeDto = require('../dtos/challenge.dto');

class ChallengeService {
  async createChallenge(missionId) {
    // 미션 존재 여부 확인
    const mission = await missionRepository.findById(missionId);
    if (!mission) {
      throw new Error(`Mission with id ${missionId} not found`);
    }

    // 첫 번째 사용자 가져오기 (과제 요구사항)
    const user = await userRepository.findFirstUser();
    if (!user) {
      throw new Error('No users found in the system');
    }

    // 이미 도전 중인 미션인지 확인
    const existingChallenge = await challengeRepository.findActiveChallengeByMissionAndUser(missionId, user.id);
    if (existingChallenge) {
      throw new Error('You are already challenging this mission');
    }

    // 도전 생성
    const createdChallenge = await challengeRepository.create(missionId, user.id);
    return new ChallengeDto(createdChallenge);
  }
}

module.exports = new ChallengeService();
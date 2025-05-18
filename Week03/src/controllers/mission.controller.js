const missionService = require('../services/mission.service');
const MissionDto = require('../dtos/mission.dto');

class MissionController {
  async createMission(req, res) {
    try {
      const storeId = parseInt(req.params.storeId);
      const missionData = MissionDto.fromRequest(req.body);

      // 필수 필드 검증
      if (!missionData.title || !missionData.description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const createdMission = await missionService.createMission(missionData, storeId);
      
      return res.status(201).json({
        message: 'Mission created successfully',
        mission: createdMission
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: `Failed to create mission: ${error.message}` });
    }
  }
}

module.exports = new MissionController();
class ChallengeDto {
    constructor(data) {
      this.id = data.id;
      this.missionId = data.mission_id;
      this.userId = data.user_id;
      this.status = data.status;
      this.createdAt = data.created_at;
      this.completedAt = data.completed_at;
    }
  }
  
  module.exports = ChallengeDto;
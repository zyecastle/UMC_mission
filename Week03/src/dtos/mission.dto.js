class MissionDto {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.reward = data.reward;
    this.storeId = data.store_id;
    this.createdAt = data.created_at;
  }

  static fromRequest(body) {
    return {
      title: body.title,
      description: body.description,
      reward: body.reward || '',
    };
  }
}

module.exports = MissionDto;
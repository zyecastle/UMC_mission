// 가게 관련 데이터 구조
class StroeDto {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.description = data.description;
    this.regionId = data.region_id;
    this.createdAt = data.created_at;
  }
  static fromRequest(body) {
    return {
      name: body.name,  // 이름 가져오기
      address: body.address,    // 주소 가져오기
      description: body.description || "",  // 설명이 없으면 빈 문자열 넣기
    };
  }
}

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
module.exports = StoreDto;
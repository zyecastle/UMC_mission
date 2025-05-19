const storeRepository = require('../repositories/store.repository');
const regionRepository = require('../repositories/region.repository');
const StoreDto = require('../dtos/store.dto');

class StoreService {
  async createStore(storeData, regionId) {
    // 지역 존재 여부 확인
    const region = await regionRepository.findById(regionId);
    if (!region) {
      throw new Error(`Region with id ${regionId} not found`);
    }

    // 가게 생성
    const createdStore = await storeRepository.create(storeData, regionId);
    return new StoreDto(createdStore);
  }
}

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

module.exports = new StoreService();
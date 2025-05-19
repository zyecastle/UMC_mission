const storeService = require('../services/store.service');
const StoreDto = require('../dtos/store.dto');

class StoreController {
  async createStore(req, res) {
    try {
      const regionId = parseInt(req.params.regionId);
      const storeData = StoreDto.fromRequest(req.body);

      // 필수 필드 검증
      if (!storeData.name || !storeData.address) {
        return res.status(400).json({ error: 'Name and address are required' });
      }

      const createdStore = await storeService.createStore(storeData, regionId);
      
      return res.status(201).json({
        message: 'Store created successfully',
        store: createdStore
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: `Failed to create store: ${error.message}` });
    }
  }
}

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

module.exports = new StoreController();
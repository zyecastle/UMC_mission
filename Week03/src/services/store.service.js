import {insertStore} from "../repositories/store.repository.js";
import { getAllStoreReviews } from "../repositories/user.repository.js";
import { StoreNotFoundError } from "../errors.js";

export const createStoreService = async (data) => {
    const storeId = await insertStore(data);
  
    if (!storeId) {
      throw new StoreNotFoundError("가게 등록에 실패했습니다", data);
    }
  
    return { storeId };
  };

  export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
  };

 
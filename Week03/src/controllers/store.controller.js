import { createStoreService } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";
import {listStoreReviews} from "../services/store.service.js";

export const createStore = async (req, res, next) => {
    try {
      const result = await createStoreService(req.body);
      return res.success(result);
    } catch (err) {
      next(err);
    }
  };

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
      );
    res.status(StatusCodes.OK).json(reviews);
  };
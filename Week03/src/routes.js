import express from "express";
import storeController from "./controllers/store.controller.js";
import reviewController from "./controllers/review.controller.js";
import missionController from "./controllers/mission.controller.js";
import challengeController from "./controllers/challenge.controller.js";

const router = express.Router();

// 1. 특정 지역에 가게 추가하기 API
router.post("/regions/:regionId/stores", storeController.createStore);

// 2. 가게에 리뷰 추가하기 API
router.post("/stores/:storeId/reviews", reviewController.createReview);

// 3. 가게에 미션 추가하기 API
router.post("/stores/:storeId/missions", missionController.createMission);

// 4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기) API
router.post(
  "/missions/:missionId/challenges",
  challengeController.createChallenge
);

export default router;

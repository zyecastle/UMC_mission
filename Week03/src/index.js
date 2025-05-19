import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {pool} from './db.config.js';
import {handleUserSignUp} from "./controllers/user.controller.js";
import {createStore} from "./controllers/store.controller.js";
import {createReview, handleListUserReviews} from "./controllers/review.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { challengeMission } from "./controllers/mission.controller.js";
import {handleListStoreReviews} from "./controllers/store.controller.js";
import { handleListStoreMissions } from "./controllers/mission.controller.js";

try {
  const conn = await pool.getConnection(); // 연결 시도
  console.log('✅ DB 연결 성공!');

  conn.release(); // 연결 반환
} catch (err) {
  console.error('❌ DB 연결 실패:', err.message);
}



dotenv.config();
const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/stores",createStore);
app.post("/api/stores/:storeId/reviews",createReview);
app.post("/api/stores/:storeId/missions",createMission);
app.post("/api/missions/:missionId/challenge", challengeMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 내가 쓴 리뷰 확인하는 API 
app.get("/users/:userId/reviews", handleListUserReviews);
app.get("/stores/:storeId/missions", handleListStoreMissions);
// 특정 가게의 미션 조회해보는 API



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});
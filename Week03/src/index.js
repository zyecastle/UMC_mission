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
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import { kakaoStrategy } from './auth.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(kakaoStrategy);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

try {
  const conn = await pool.getConnection(); // 연결 시도
  console.log('✅ DB 연결 성공!');

  conn.release(); // 연결 반환
} catch (err) {
  console.error('❌ DB 연결 실패:', err.message);
}




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
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
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



app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get('/oauth2/login/kakao', passport.authenticate('kakao'));
app.get(
  '/oauth2/callback/kakao',
  passport.authenticate('kakao', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    console.log('카카오 로그인 유저:', req.user);
    res.redirect('/'); // 또는 사용자 정보 확인용 라우터로 리디렉션
  }
);


app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
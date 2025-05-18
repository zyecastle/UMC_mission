// test-db.js

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // .env 불러오기

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "UMC_test", // ← 직접 넣어서 확인
    });

    console.log("✅ DB 연결 성공!");
    await connection.end();
  } catch (error) {
    console.error("❌ DB 연결 실패:");
    console.error(error.message);
    console.log("DB_NAME from env:", process.env.DB_NAME);
  }
};

testConnection();

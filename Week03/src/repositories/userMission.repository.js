import { pool } from "../db.config.js";
import prisma from "../db.config.js";

export const checkMissionExists = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM mission WHERE id = ?", [missionId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const checkAlreadyChallenged = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM user_mission WHERE user_id = ? AND mission_id = ?",
      [userId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const insertUserMission = async (userId, missionId) => {
  const userMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "in_progress",
    },
  });

  console.log("insertUserMission 반환값:", userMission); // ✅ 여기도 찍어보세요
  return userMission;
};
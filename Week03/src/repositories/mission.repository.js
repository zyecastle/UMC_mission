import { pool } from "../db.config.js";
import prisma from "../db.config.js";

export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM store WHERE id = ?", [storeId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const insertMission = async (storeId, data) => {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) return null;

  const mission = await prisma.mission.create({
    data: {
      storeId,
      point: data.point,
      content: data.content,
      isActive: true,
    },
  });

  return mission;
};

export const getMissionsByStoreId = async (storeId) => {
    return await prisma.mission.findMany({
      where: {
        storeId: storeId,
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        point: true,
        content: true,
        isActive: true,
        createdAt: true
      }
    });
  };

export const isAlreadyChallenged = async (userId, missionId) => {
    const existing = await prisma.userMission.findUnique({
      where: {
        userId_missionId: {
          userId,
          missionId,
        },
      },
    });
  
    return !!existing;
  };
  
export const insertUserMission = async (userId, missionId) => {
    const userMission = await prisma.userMission.create({
      data: {
        userId,
        missionId,
        status: "in_progress", // 기본값
      },
    });
    console.log("insertUserMission 반환값:", userMission); // ✅ 여기도 찍어보세요
    return userMission;
  };
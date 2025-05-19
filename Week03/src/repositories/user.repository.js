//데이터 조작과 관련한 코드를 저장하는 곳

import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  //// 먼저 같은 이메일을 가진 사용자가 이미 있는지 검사
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null; //// 이미 있으면 등록 안 함 (중복 방지)
  }

  //// 없으면 새 사용자 데이터를 DB에 저장
  const created = await prisma.user.create({ data: data });
  return created.id; //// 그 사용자의 id만 반환
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" }, //// 음식 카테고리 id 순 정렬
  });

  return preferences;
};



export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
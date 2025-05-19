export const bodyToMission = (body, storeId) => {
    return {
      storeId,
      content: body.content,
      point: body.point,
      isActive: body.isActive ?? true
    };
  };
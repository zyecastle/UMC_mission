export const bodyToStore = (body) => {
    return {
      name: body.name,
      description: body.description,
      regionId: body.regionId,
      foodCategoryId: body.foodCategoryId,
      address: body.address,
      phoneNumber: body.phoneNumber,
    };
  };
  
  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };
export const bodyToReview = (body, storeId) => {
    return {
      storeId,
      title: body.title,
      content: body.content,
      rating: body.rating,
      images: body.images || []
    };
  };
import http from 'utils/requestUtils/common';

const getAll = (params) => {
    const { userId, bookId } = params;

    const userFilter = userId ? `&userId=${userId}` : '';
    const bookFilter = bookId ? `&bookId=${bookId}` : '';

    return http.get(`/reviews?_expand=user&_expand=book${userFilter}${bookFilter}`);
};

const postReview = (data) => {

    return http.post(`/reviews`, { ...data });
};

const editReview = (data) => {

    return http.patch(`/reviews/${data.id}`, { ...data });
};

const deleteReview = (id) => {

    return http.delete(`/reviews/${id}`);
};

const upvoteReview = ({ upvotes, id }) => {

    return http.patch(`/reviews/${id}/vote`, { upvotes });
};

const downvoteReview = ({ downvotes, id }) => {

    return http.patch(`/reviews/${id}/vote`, { downvotes });
};

const reviewService = {
    getAll,
    postReview,
    editReview,
    deleteReview,
    upvoteReview,
    downvoteReview
};

export default reviewService;
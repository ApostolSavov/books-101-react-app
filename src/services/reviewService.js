import http from 'utils/requestUtils/common';

const getAll = (params) => {
    const { userId, bookId } = params;

    const userFilter = userId ? `&userId=${userId}` : '';
    const bookFilter = bookId ? `&bookId=${bookId}` : '';

    return http.get(`/reviews?_expand=user${userFilter}${bookFilter}`);
};

const getAllByBook = (id) => {
    return http.get(`/reviews?_expand=user&bookId=${id}`);
};

const getAllByUser = (id) => {
    return http.get(`/reviews?_expand=user&userId=${id}`);
};

const reviewService = {
    getAll,
    getAllByBook,
    getAllByUser
};

export default reviewService;
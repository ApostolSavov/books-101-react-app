const itemsByPage = (collection, page, limit = 20) => {
    return collection.slice((page - 1) * limit, page * limit);
};

export default itemsByPage;
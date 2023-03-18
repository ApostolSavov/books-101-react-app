export const filterHandler = (book, filter) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    return (title.includes(filter) || author.includes(filter));
};
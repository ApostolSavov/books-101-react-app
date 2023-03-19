import './BookDetails.scss';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../slices/books";


const BookDetailsPage = () => {
    const { collection, isLoaded, error } = useSelector(({ books }) => books);
    const [currentBook, setCurrentBook] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        if (isLoaded) {
            setCurrentBook(collection.find(book => book.id == id));
        } else {
            dispatch(
                getAllBooks()
            );
        }
    }, [collection]);

    console.log({ currentBook });

    return (
        <div className="book-details-page">

            <div className="book-details-card">
                <img src={`../${currentBook.imageLink}`} />
            </div>

            <div className="book-details-info">

                <div className="books-details-title">
                    Title: {currentBook.title}
                </div>

                <div className="book-details-author">
                    Author: {currentBook.author}
                </div>

                <div className="book-details-country">
                    Country: {currentBook.country}
                </div>

                <div className="book-details-language">
                    Language: {currentBook.language}
                </div>

                <div className="book-details-pages">
                    Pages: {currentBook.pages}
                </div>

                <div className="book-details-year">
                    Year: {currentBook.year}
                </div>

                <div className="book-details-wiki-link">
                    <a href={currentBook.link} target={'_blank'}>
                        Go to Wiki page
                    </a>
                </div>

                <div className="book-details-see-reviews-btn">
                    <Link to={`/catalog/${currentBook.id}/reviews`}>
                        See reviews
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default BookDetailsPage;
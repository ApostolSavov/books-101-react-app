import './BookDetails.scss';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../slices/books";
import { getAllReviews } from 'slices/review';
import AddReviewCta from 'components/AddReviewCta/AddReviewCta';
import Spinner from 'utils/Spinner/Spinner';


const BookDetailsPage = () => {
    //add async hook that takes array of loaded, errors
    const { collection, isLoaded, error } = useSelector(({ books }) => books);
    const { list, isLoaded: reviewsLoaded, error: reviewsError } = useSelector(({ reviews }) => reviews);
    const { user, isLoaded: userLoaded, error: userError } = useSelector(({ user }) => user);
    const [currentBook, setCurrentBook] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();

    const loaders = [isLoaded, reviewsLoaded];
    const errors = [error, reviewsError];


    useEffect(() => {
        dispatch(getAllReviews({ bookId: id, userId: user?.user?.id }));

        if (isLoaded && reviewsLoaded) {
            setCurrentBook(collection.find(book => book?.id == id));
        } else {
            dispatch(getAllBooks());
        }
    }, [collection]);

    const existingReviewId = list.length > 0 ? list[0]?.id : null;

    return (
        <div className="book-details-page">

            {!isLoaded && (
                <div className="generic-centering-wrapper">
                    <Spinner />
                </div>
            )}

            {loaders.every(Boolean) && !errors.some(Boolean) && (

                <>
                    <div className='book-details-cta-container'>

                        <AddReviewCta
                            noAuth={!user}
                            noReview={!existingReviewId}
                            bookId={id}
                            reviewId={existingReviewId}
                        />

                    </div>

                    <div className="book-details-card">
                        <img src={`../${currentBook.imageLink}`} />
                    </div>

                    <div className="book-details-info">


                        <div className="book-details-title">
                            Title: <strong>{currentBook.title}</strong>
                        </div>

                        <div className="book-details-author">
                            Author: <strong>{currentBook.author}</strong>
                        </div>

                        <div className="book-details-country">
                            Country: <strong>{currentBook.country}</strong>
                        </div>

                        <div className="book-details-language">
                            Language: <strong>{currentBook.language}</strong>
                        </div>

                        <div className="book-details-pages">
                            Pages: <strong>{currentBook.pages}</strong>
                        </div>

                        <div className="book-details-year">
                            Year: <strong>{currentBook.year}</strong>
                        </div>

                        <div className='book-details-links-container'>

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
                </>
            )}
        </div>
    );
};

export default BookDetailsPage;
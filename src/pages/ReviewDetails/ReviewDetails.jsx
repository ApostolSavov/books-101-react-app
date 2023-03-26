import ReviewActions from 'components/ReviewActions/ReviewActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from 'slices/review';
import Spinner from 'utils/Spinner/Spinner';
import './ReviewDetails.scss';

const ReviewDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { list, isLoaded, error } = useSelector(({ reviews }) => reviews);
    const [currentReview, setCurrentReview] = useState({});

    useEffect(() => {
        if (isLoaded) {
            setCurrentReview(list.find(review => review.id == id));
        } else {
            dispatch(getAllReviews({ bookId: currentReview.book?.id }));
        }
    }, [list]);

    const onClickUpvote = () => { };

    const onClickDownvote = () => { };

    return (
        <div className="review-details-page">

            {!isLoaded && (
                <div className="generic-centering-wrapper">
                    <Spinner />
                </div>
            )}

            {isLoaded && !error && (
                <>
                    <div className="review-details-card">
                        <img src={`../${currentReview.book?.imageLink}`} />
                    </div>

                    <div className="review-details-info">


                        <div className="review-details-title">
                            Review: <strong>{currentReview.title}</strong>
                        </div>

                        <div className="review-details-author">
                            Author: <strong>{currentReview.user?.username}</strong>
                        </div>

                        <div className="review-details-content">
                            <strong>{currentReview.content}</strong>
                        </div>

                        <div className="review-details-rating">
                            Rating: <strong>{currentReview.rating}</strong>
                        </div>

                        <div className='review-details-votes-container'>
                            What others think of this review

                            <div className="review-details-votes">
                                <strong>👍 {currentReview.upvotes}</strong>

                                <strong>👎 {currentReview.downvotes}</strong>
                            </div>
                        </div>


                        <div className='review-details-actions-container'>
                            What do you think of this review?

                            <div className="review-details-votes">
                                <strong
                                    className="review-details-actions-upvote"
                                    onClick={onClickUpvote}>
                                    👍
                                </strong>

                                <strong
                                    className="review-details-actions-downvote"
                                    onClick={onClickDownvote}>
                                    👎
                                </strong>
                            </div>
                        </div>

                        <ReviewActions reviewId={id} />

                    </div>
                </>
            )}


        </div>
    );
};

export default ReviewDetails;
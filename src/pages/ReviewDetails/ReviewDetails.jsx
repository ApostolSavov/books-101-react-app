import ReviewActions from 'components/ReviewActions/ReviewActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { downvoteReview, getAllReviews, upvoteReview } from 'slices/review';
import useIsAuth from 'utils/hooks/useIsAuth';
import Spinner from 'utils/Spinner/Spinner';
import './ReviewDetails.scss';

const ReviewDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { list, isLoaded, error } = useSelector(({ reviews }) => reviews);
    const { user, isLoaded: userLoaded, error: userError } = useSelector(({ user }) => user);
    const [currentReview, setCurrentReview] = useState({});

    useEffect(() => {
        if (isLoaded) {
            setCurrentReview(list.find(review => review.id == id));
        } else {
            dispatch(getAllReviews({ bookId: currentReview.book?.id }));
        }
    }, [list]);

    const isOwner = useIsAuth(true, id);
    const isAuth = useIsAuth();
    const hasDownvoted = () => currentReview?.downvotes?.includes(user.user.id);
    const hasUpvoted = () => currentReview?.upvotes?.includes(user.user.id);

    const onClickUpvote = () => {
        if (hasDownvoted()) {
            return alert('You have already downvoted this review. To upvote, first un-downvote by clicking again.');
        }
        if (hasUpvoted()) {
            return dispatch(
                upvoteReview({
                    upvotes: [...currentReview.upvotes.filter((id) => id != user.user.id)],
                    id: currentReview.id
                })
            )
                .then(() => setCurrentReview({ ...currentReview, upvotes: [...currentReview.upvotes.filter((id) => id != user.user.id)] }));
        }

        return dispatch(
            upvoteReview({
                upvotes: [...currentReview.upvotes, user.user.id],
                id: currentReview.id
            })
        )
            .then(() => setCurrentReview({ ...currentReview, upvotes: [...currentReview.upvotes, user.user.id] }));
    };

    const onClickDownvote = () => {
        if (hasUpvoted()) {
            return alert('You have already upvoted this review. To downvote, first un-upvote by clicking again.');
        }
        if (hasDownvoted()) {
            return dispatch(
                downvoteReview({
                    downvotes: [...currentReview.downvotes.filter((id) => id != user.user.id)],
                    id: currentReview.id
                })
            )
                .then(() => setCurrentReview({ ...currentReview, downvotes: [...currentReview.downvotes.filter((id) => id != user.user.id)] }));
        }

        return dispatch(
            downvoteReview({
                downvotes: [...currentReview.downvotes, user.user.id],
                id: currentReview.id
            })
        )
            .then(() => setCurrentReview({ ...currentReview, downvotes: [...currentReview.downvotes, user.user.id] }));
    };

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
                            Rating: <strong>{currentReview.rating ? [...Array(Number(currentReview.rating)).keys()].map(() => '⭐️') : ''}</strong>
                        </div>

                        <div className='review-details-votes-container'>
                            What others think of this review

                            <div className="review-details-votes">
                                <strong>👍 {currentReview.upvotes?.length}</strong>

                                <strong>👎 {currentReview.downvotes?.length}</strong>
                            </div>
                        </div>

                        {!isAuth && (
                            <div>Please register or login to vote</div>
                        )}

                        {isAuth && !isOwner && (
                            <div className='review-details-actions-container'>
                                What do you think of this review?

                                <div className="review-details-votes">
                                    <strong
                                        className="review-details-actions-upvote"
                                        onClick={onClickUpvote}>
                                        {hasUpvoted() ? <span className='green-thumb'>👍</span> : <span>👍</span>}
                                    </strong>

                                    <strong
                                        className="review-details-actions-downvote"
                                        onClick={onClickDownvote}>
                                        {hasDownvoted() ? <span className='red-thumb'>👎</span> : <span>👎</span>}

                                    </strong>
                                </div>
                            </div>
                        )}

                        {isOwner && (
                            <ReviewActions reviewId={id} />
                        )}

                    </div>
                </>
            )}


        </div>
    );
};

export default ReviewDetails;
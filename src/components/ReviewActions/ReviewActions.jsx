import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteReview, getAllReviews } from 'slices/review';
import Spinner from 'utils/Spinner/Spinner';
import './ReviewActions.scss';


const ReviewActions = (props) => {

    const { reviewId } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDelete = () => {
        const action = window.confirm('Are you sure you want to delete this review?');
        if (action) {
            dispatch(
                deleteReview(reviewId)
            )
                .then(() => navigate('/reviews'));
        }
    };

    const onEdit = () => {
        navigate(`/reviews/${reviewId}/edit`);
    };

    return (
        <div className='review-actions'>

            <div onClick={onEdit} className='review-edit'>
                Edit Review
            </div>

            <div onClick={onDelete} className='review-delete'>
                Delete Review
            </div>

        </div>
    );
};

export default ReviewActions;
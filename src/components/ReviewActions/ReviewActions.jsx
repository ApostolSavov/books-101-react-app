import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteReview } from 'slices/review';
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
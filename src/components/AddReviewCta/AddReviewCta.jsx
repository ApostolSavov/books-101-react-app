import { Link } from 'react-router-dom';
import './AddReviewCta.scss';


const AddReviewCta = (props) => {

    const {
        noAuth,
        noReview,
        bookId,
        reviewId
    } = props;


    return (
        <div className='add-review-cta'>

            {noAuth && (
                <div className='vertical-btn-container'>
                    <Link to={`/register`}>
                        <div className='bolder'>Register</div>
                    </Link>
                    Or
                    <Link to={`/login`}>
                        <div className='bolder'>Login</div>
                    </Link>
                    To Review
                </div>
            )}

            {noReview && !noAuth && (
                <Link to={`/catalog/${bookId}/add-review`}>
                    <div className='bolder'>Add Review</div>
                </Link>
            )}

            {!noReview && !noAuth && (

                <Link to={`/reviews/${reviewId}`}>
                    <div className='bolder'>Go To My Review</div>
                </Link>
            )}

        </div>
    );
};

export default AddReviewCta;
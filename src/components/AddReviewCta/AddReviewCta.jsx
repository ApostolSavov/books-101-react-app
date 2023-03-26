import { Link } from 'react-router-dom';
import './AddReviewCta.scss';


const AddReviewCta = (props) => {

    const {
        noAuth,
        noReview,
        bookId,
        reviewId
    } = props;


    console.log({ noAuth, noReview });


    return (
        <div className='add-review-cta'>

            {noAuth && (
                <div className='vertical-btn-container'>
                    <Link to={`/register`}>
                        <div>Register</div>
                    </Link>
                    Or
                    <Link to={`/login`}>
                        <div>Login</div>
                    </Link>
                    To Review
                </div>
            )}

            {noReview && !noAuth && (
                <Link to={`/catalog/${bookId}/add-review`}>
                    <div>Add Review</div>
                </Link>
            )}

            {!noReview && !noAuth && (

                <Link to={`/reviews/${reviewId}`}>
                    <div>Go To My Review</div>
                </Link>
            )}

        </div>
    );
};

export default AddReviewCta;
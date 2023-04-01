import { Link } from 'react-router-dom';
import './Review.scss';


const Review = (props) => {

    const {
        review
    } = props;

    console.log({ review });


    return (
        <div className='review'>

            <div className='review-book'>
                <img className='review-book-image' src={`../../${review.book.imageLink}`} alt="" />
            </div>


            <div className='review-summary'>

                <div className='review-author'>
                    By User: {review.user.username}
                </div>

                <div className='review-title'>
                    {review.title}
                </div>

                <div className='review-rating'>
                    Rating: {[...Array(Number(review.rating)).keys()].map(() => '⭐️')}
                </div>
            </div>

            <div className='review-actions'>

                <Link to={`/reviews/${review.id}`}>
                    <div className='review-details-btn'>
                        Read Full Review
                    </div>
                </Link>

            </div>

        </div>
    );
};

export default Review;
import './Review.scss';


const Review = (props) => {

    const {
        review
    } = props;


    return (
        <div className='review'>
            {review.title}

            {review.content}

            {review.rating}

            {review.upvotes}

            {review.downvotes}
        </div>
    );
};

export default Review;
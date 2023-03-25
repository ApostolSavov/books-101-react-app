import Review from 'components/Review/Review';
import './ReviewList.scss';


const ReviewList = (props) => {

    const {
        list
    } = props;


    console.log({ list });

    return (
        <div className='reviews-list'>
            {list.map((review) => {
                return (
                    <Review
                        key={review.id}
                        review={review}
                    />
                );
            })}
        </div>
    );
};

export default ReviewList;
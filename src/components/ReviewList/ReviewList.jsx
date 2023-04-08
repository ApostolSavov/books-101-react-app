import Review from 'components/Review/Review';
import './ReviewList.scss';


const ReviewList = (props) => {

    const {
        list
    } = props;


    console.log({ list });

    return (
        <div className='reviews-list'>
            {list.length == 0 && (
                <div className="generic-centering-wrapper">No Reviews Found</div>
            )}
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
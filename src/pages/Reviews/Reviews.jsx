import ReviewList from 'components/ReviewList/ReviewList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from 'slices/review';
import Spinner from 'utils/Spinner/Spinner';
import './Reviews.scss';


const Reviews = (props) => {

    const {
        byBook,
        byUser,
    } = props;

    const params = useParams();
    const dispatch = useDispatch();

    const { list, isLoaded, error } = useSelector(({ reviews }) => reviews);
    const { user } = useSelector(({ user }) => user);

    useEffect(() => {
        const { id } = params;

        if (byBook) {
            dispatch(
                getAllReviews({ bookId: id })
            );
        } else if (byUser) {
            dispatch(
                getAllReviews({ userId: id })
            );
        } else {
            dispatch(
                getAllReviews({})
            );
        }

    }, [byBook, byUser]);


    return (
        <div className='reviews-page'>

            {byUser && user && (
                <div className='generic-centering-wrapper username-badge'>
                    Currently logged as:&nbsp;<strong>{user?.user?.username}</strong>
                </div>
            )}

            {!isLoaded && (
                <div className="generic-centering-wrapper">
                    <Spinner />
                </div>
            )}


            {error && (
                <div className="generic-centering-wrapper">
                    <h2>Error: {error}</h2>
                </div>
            )}

            {!error && isLoaded && (
                <ReviewList list={list} />
            )}
        </div>
    );
};

export default Reviews;
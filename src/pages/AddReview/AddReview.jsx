import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './AddReview.scss';
import { postReview } from 'slices/review';
import Spinner from 'utils/Spinner/Spinner';

const AddReview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { list, error } = useSelector(({ reviews }) => reviews);
    const { user } = useSelector(({ user }) => user);


    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            rating: '1'
        },
        validationSchema: Yup.object({
            title: Yup.string().min(10, 'Title should be at least 10 characters long.').required(),
            content: Yup.string().min(100, 'Content should be at least 100 characters long.').required(),
            rating: Yup.string().required(),
        }),
        onSubmit: (values) => {
            const reviewData = {
                ...values,
                upvotes: [],
                downvotes: [],
                userId: user.user.id,
                bookId: Number(id)
            };
            dispatch(
                postReview(reviewData)
            )
                .then(() => navigate('/reviews'))
                .catch((err) => alert(err));
        }
    });

    return (
        <div className='add-review-page'>
            {!list && (
                <Spinner />
            )}


            {error && (
                <div className="generic-centering-wrapper">
                    <h2>Error: {error}</h2>
                </div>
            )}

            {list && (

                <form onSubmit={formik.handleSubmit} className='form'>

                    <div className='form-input-wrapper'>
                        <label htmlFor={'title'}>
                            Title
                        </label>
                        <input
                            id='title'
                            name='title'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            className='form-input'
                        />
                        {formik.errors.title && <p className='error-text'>{formik.errors.title}</p>}
                    </div>

                    <div className='form-input-wrapper'>
                        <label htmlFor={'content'}>
                            Content
                        </label>
                        <textarea
                            id='content'
                            name='content'
                            onChange={formik.handleChange}
                            value={formik.values.content}
                            className='form-input'
                        />
                        {formik.errors.content && <p className='error-text'>{formik.errors.content}</p>}
                    </div>

                    <div className='form-input-wrapper'>
                        <label htmlFor={'rating'}>
                            Rating
                        </label>
                        <select
                            id='rating'
                            name='rating'
                            onChange={formik.handleChange}
                            value={formik.values.rating}
                            className='form-input'
                        >
                            <option value={'1'} >1</option>
                            <option value={'2'} >2</option>
                            <option value={'3'} >3</option>
                            <option value={'4'} >4</option>
                            <option value={'5'} >5</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='form-submit-btn'
                    >
                        Post
                    </button>

                </form>

            )}
        </div>
    );
};

export default AddReview;
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllReviews, editReview } from 'slices/review';
import './EditReview.scss';
import { useState, useEffect } from 'react';
import Spinner from 'utils/Spinner/Spinner';


const EditReview = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { list, isLoaded, error } = useSelector(({ reviews }) => reviews);

    const [currentReview, setCurrentReview] = useState({});

    useEffect(() => {
        if (isLoaded) {
            setCurrentReview(list.find(review => review.id == id));
        } else {
            dispatch(getAllReviews({}));
        }
    }, [list]);

    const formik = useFormik({
        initialValues: {
            title: currentReview?.title,
            content: currentReview?.content,
            rating: Number(currentReview?.rating)
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required(),
            content: Yup.string().required(),
            rating: Yup.number().required(),
        }),
        onSubmit: (values) => {
            const reviewData = {
                ...values,
                id: (currentReview.id)
            };
            dispatch(
                editReview(reviewData)
            )
                .then(() => navigate('/reviews'));
        }
    });

    return (
        <div className='add-review-page'>

            {!isLoaded && (
                <Spinner />
            )}


            {error && (
                <div className="generic-centering-wrapper">
                    <h2>Error: {error}</h2>
                </div>
            )}

            {isLoaded && (
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
                            className='form-input text-area'
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
                            <option value={1} >1</option>
                            <option value={2} >2</option>
                            <option value={3} >3</option>
                            <option value={4} >4</option>
                            <option value={5} >5</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='form-submit-btn'
                    >
                        Edit
                    </button>

                </form>
            )}

        </div>
    );
};

export default EditReview;
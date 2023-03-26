import './Register.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailService from '../../utils/helpers/emailService';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'slices/user';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(10, 'Username cannot exceed 10 characters.')
                .required('Required'),
            email: Yup.string()
                .email(new RegExp(emailService.emailRegex), 'Invalid email format')
                .required(),
            password: Yup.string()
                .min(6, 'Password should be at least 6 characters long.')
                .required('Required')
        }),
        onSubmit: (values) => {
            const data = {
                ...values,
                readlist: [],
                favourites: [],
                upvotes: [],
                downvotes: []
            };
            dispatch(
                register(data)
            )
                .then(() => navigate('/catalog'))
                .catch(() => alert('There was a problem'));
        }
    });

    return (
        <div className='register-page'>

            <form onSubmit={formik.handleSubmit} className='form'>

                <div className='form-input-wrapper'>
                    <input
                        id='username'
                        name='username'
                        type='text'
                        placeholder='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className='form-input'
                    />
                    {formik.errors.username && <p>{formik.errors.username}</p>}
                </div>

                <div className='form-input-wrapper'>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className='form-input'
                    />
                </div>

                <div className='form-input-wrapper'>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className='form-input'
                    />
                </div>

                <button
                    type='submit'
                    className='form-submit-btn'
                >
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;
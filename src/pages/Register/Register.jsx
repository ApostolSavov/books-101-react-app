import './Register.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
                .email('Invalid email format')
                .required(),
            password: Yup.string()
                .min(6, 'Password should be at least 6 characters long.')
                .required('Required')
        }),
        onSubmit: (values) => {
            const data = {
                ...values,
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
                    <label htmlFor={'username'}>
                        Username
                    </label>
                    <input
                        id='username'
                        name='username'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className='form-input'
                    />
                    {formik.errors.username && <p className='error-text'>{formik.errors.username}</p>}
                </div>

                <div className='form-input-wrapper'>
                    <label htmlFor={'email'}>
                        Email
                    </label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className='form-input'
                    />
                    {formik.errors.email && <p className='error-text'>{formik.errors.email}</p>}
                </div>

                <div className='form-input-wrapper'>
                    <label htmlFor={'password'}>
                        Password
                    </label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className='form-input'
                    />
                    {formik.errors.password && <p className='error-text'>{formik.errors.password}</p>}
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
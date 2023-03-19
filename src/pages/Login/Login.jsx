import './Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailService from '../../utils/helpers/emailService';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(new RegExp(emailService.emailRegex), 'Invalid email format')
        }),
        onSubmit: (values) => {
            userService.login(
                {
                    email: values.email,
                    password: values.password,
                }
            )
                .then(() => navigate('/catalog'))
                .catch(() => alert('There was a problem'));
        }
    });

    return (
        <div className='login-page'>

            <form onSubmit={formik.handleSubmit} className='form'>

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
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;
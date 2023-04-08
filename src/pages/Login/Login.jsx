import './Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../slices/user";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
        }),
        onSubmit: (values) => {
            dispatch(
                login(values)
            )
                .then(() => navigate('/catalog'))
                .catch(() => alert('There was a problem'));
        }
    });


    return (
        <div className='login-page'>

            <form onSubmit={formik.handleSubmit} className='form'>

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
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;
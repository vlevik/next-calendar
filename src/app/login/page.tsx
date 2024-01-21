'use client';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import 'bulma';
import cn from 'classnames';
import { AuthPayload } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '../../redux/userSlice';
import { HOME_ROUTE, SIGNUP_ROUTE } from '@/constants/routes';
import { loginUser } from '@/services';

const formSchema = yup.object({
  userName: yup.string().min(3, 'Min length is 3 letters').required('Name is required!'),
  password: yup.string().min(6, 'Min length is 6 letters').required('Password is required!'),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, errors, touched, resetForm, setErrors } = useFormik<AuthPayload>({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await loginUser(values);
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));

        resetForm();
        dispatch(setUser(res.user));
        router.push(HOME_ROUTE);
      } catch (err: any) {
        console.log(err);

        setErrors({
          password: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div className="container box">
      <h1 className="title">Welcome back! Login to see your calendar!</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              id="userName"
              name="userName"
              className={cn('input', { 'is-danger': errors.userName && touched.userName })}
              type="text"
              placeholder="Username"
              value={values.userName}
              onChange={handleChange}
            />
            {errors.userName && touched.userName && <p className="help is-danger">{errors.userName}</p>}
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <input
              id="password"
              name="password"
              className={cn('input', { 'is-danger': errors.password && touched.password })}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && <p className="help is-danger">{errors.password}</p>}
          </p>
        </div>

        <div className="field">
          <p className="control">
            <button disabled={loading} className={cn('button is-success', { 'is-loading': loading })}>
              Login
            </button>
          </p>
        </div>
      </form>

      <div className="field">
        <h3 className="subtitle">Don&apos;t have an account?</h3>
        <p className="control">
          <button className="button is-info" onClick={() => router.push(SIGNUP_ROUTE)}>
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

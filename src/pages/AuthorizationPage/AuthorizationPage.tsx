import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'

import { ProfileAuthorization } from '../../interfaces/user'
import { useAppSelector, useAppDispatch } from '../../assets/hooks/hooksByTS'
import { fetchAuthorizationUser } from '../../store/slices/services'

import classes from './AuthorizationPage.module.scss'

const LoginPage: React.FC = () => {
  const { status, error, isAuth } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ProfileAuthorization>({ mode: 'onBlur' })

  const onSubmit = (data: ProfileAuthorization) => {
    const validData = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(fetchAuthorizationUser(validData))
    reset()
  }

  useEffect(() => {
    if (isAuth) {
      reset()
      navigate('/', { replace: true })
    }
  }, [isAuth])

  return (
    <section className={classes['container']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes['sign-in']}>Sign In</h4>

        <label className={classes['label']}>
          Email address
          <input
            type="email"
            placeholder="Email address"
            autoFocus
            className={classes['input']}
            {...register('email', {
              required: 'Please choose email address',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Sorry, only letters (a-z), numbers(0-9), and periods (.) are allowed',
              },
            })}
          />
        </label>
        <span className={classes['error']}>{errors?.email?.message} </span>

        <label className={classes['label']}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={classes['input']}
            {...register('password', {
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Password must be between 6 and 40 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be between 6 and 40 characters',
              },
            })}
          />
        </label>
        {errors?.password && <span className={classes.error}>{errors?.password?.message || ''}</span>}
        <span className={classes.error}>{error ?? ''}</span>

        <button className={classes['btn']} type="submit" disabled={!isValid}>
          {status ? (
            <ThreeDots
              height="20"
              width="40"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ justifyContent: 'center' }}
              visible={true}
            />
          ) : (
            'Login'
          )}
        </button>
        <span className={classes['text']}>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </span>
      </form>
    </section>
  )
}

export default LoginPage

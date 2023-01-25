import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'

import { fetchRegistrationUser } from '../../store/slices/services'
import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import { ProfileRegistration } from '../../interfaces/user'

import classes from './RegistrationPage.module.scss'

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isReg, error, status } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<ProfileRegistration>({ mode: 'onBlur' })

  const onSubmit = (data: ProfileRegistration) => {
    const validData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(fetchRegistrationUser(validData))
    alert(JSON.stringify(data))
    reset()
  }

  useEffect(() => {
    if (!isReg) {
      navigate('/sign-up', { replace: true })
    } else {
      reset()
      navigate('/sign-in', { replace: true })
    }
  }, [isReg])

  return (
    <section className={classes['container']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes['sign-up']}>Create new account</h4>

        <label className={classes['label']}>
          Username
          <input
            type="text"
            placeholder="Username"
            className={classes['input']}
            {...register('username', {
              required: 'Please enter a username',
              minLength: {
                value: 3,
                message: 'Username must be between 3 and 20 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be between 3 and 20 characters',
              },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Sorry, only letters (a-z) and numbers(0-9) are allowed',
              },
            })}
            autoFocus
          />
        </label>
        <span className={classes['error']}>{errors?.username?.message} </span>

        <label className={classes['label']}>
          Email address
          <input
            type="email"
            placeholder="Email address"
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
        <span className={classes['error']}>{errors?.password?.message} </span>

        <label className={classes['label']}>
          Repeat password
          <input
            type="password"
            placeholder="Password"
            className={classes['input']}
            {...register('repeatPassword', {
              required: 'Please enter a password',
              minLength: 6,
              maxLength: 40,
              validate: (value: string) => {
                if (watch('password') !== value) {
                  return 'Пароль должен совпадать'
                }
              },
            })}
          />
        </label>
        <span className={classes['error']}>{errors?.repeatPassword?.message} </span>

        <div className={classes['wrap-checkbox']}>
          <input
            type="checkbox"
            className={classes['checkbox']}
            id="userAgreement"
            {...register('userAgreement', { required: 'Agreement with terms is required' })}
          ></input>
          <label htmlFor="userAgreement">I agree to the processing of my personal information</label>
        </div>
        {/* <span className={classes['error']}>{errors?.userAgreement?.message} </span> */}
        {errors?.userAgreement && <span className={classes.error}>{errors?.userAgreement?.message || ''}</span>}
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
            'Create'
          )}
        </button>
        <span className={classes['text']}>
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
        </span>
      </form>
    </section>
  )
}

export default RegistrationPage

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'

import { fetchUpdateUser } from '../../store/slices/services'
import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import { Profile } from '../../interfaces/user'

import classes from './ProfilePage.module.scss'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { error, status, isUpdate } = useAppSelector((state) => state.user)
  const { username, email, image } = useAppSelector((state) => state.user.user)

  // const navigate = useNavigate()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Profile>({ mode: 'onBlur', defaultValues: { username, email, image: image } })

  const onSubmit = (data: Profile) => {
    const validData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.avatar,
      },
    }
    dispatch(fetchUpdateUser(validData))
    reset()
  }
  // useEffect(() => {
  //   if (isUpdate) {
  //     // const timeout = setTimeout(() => {
  //     navigate('/', { replace: true })
  //     // }, 2000)
  //     // return clearTimeout(timeout)
  //   }
  // }, [isUpdate])

  return (
    <section className={classes['container']}>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes['edit']}>Edit Profile</h4>

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
            placeholder="New password"
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
          Avatar image(url)
          <input
            type="text"
            placeholder="Avatar image"
            className={classes['input']}
            {...register('avatar', {
              pattern: {
                value:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                message: 'url entered incorrectly',
              },
            })}
          />
        </label>

        <span className={classes['error']}>{error ?? ''}</span>
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
            'Save'
          )}
        </button>
        <span className={classes['success']}>{isUpdate ? 'data updated successfully' : ''}</span>
      </form>
    </section>
  )
}

export default ProfilePage

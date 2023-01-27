import { Link, Outlet } from 'react-router-dom'

import { togglePage } from '../../store/slices/articleSlice'
import { fetchPageNumber } from '../../store/slices/services'
import { logOut } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import defaultAvatar from '../../assets/images/Avatar.svg'

import classes from './Layout.module.scss'

const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector((state) => state.user)
  const { username, image } = useAppSelector((state) => state.user.user)
  console.log(isAuth)
  return (
    <>
      <header>
        <Link
          to="/"
          className={classes['home__btn']}
          onClick={() => {
            dispatch(togglePage(1))
            dispatch(fetchPageNumber(1))
          }}
        >
          Realworld Blog
        </Link>
        {!isAuth ? (
          <div>
            <Link to="/sign-in" className={classes['sign-in__btn']}>
              Sign In
            </Link>
            <Link to="/sign-up" className={classes['sign-up__btn']}>
              Sign Up
            </Link>
          </div>
        ) : (
          <div className={classes['is-login']}>
            <Link to="/profile" className={classes['profile']}>
              <span>{username}</span>
              <img
                className={classes['avatar']}
                src={image === '' ? defaultAvatar : image ?? defaultAvatar}
                alt="avatar"
              />
            </Link>
            <Link to="/" className={classes['log-out']} onClick={() => dispatch(logOut())}>
              Log Out
            </Link>
          </div>
        )}
      </header>
      <main className={classes['main']}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout

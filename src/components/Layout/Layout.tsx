import { Link, Outlet } from 'react-router-dom'

import { togglePage } from '../../store/slices/articleSlice'
import { useAppDispatch } from '../../assets/hooks/hooksByTS'

import classes from './Layout.module.scss'

const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <header>
        <Link to="/" className={classes['home__btn']} onClick={() => dispatch(togglePage(1))}>
          Realworld Blog
        </Link>
        <div>
          <Link to="/sign-in" className={classes['sign-in__btn']}>
            Sign In
          </Link>
          <Link to="/sign-up" className={classes['sign-up__btn']}>
            Sign Up
          </Link>
        </div>
      </header>
      <main className={classes['main']}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout

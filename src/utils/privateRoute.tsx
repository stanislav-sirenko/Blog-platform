import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from '../assets/hooks/hooksByTS'

const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.user)
  return isAuth ? <Outlet /> : <Navigate to="sign-in" />
}

export default PrivateRoute

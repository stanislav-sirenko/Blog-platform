import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage'
import SinglePage from '../pages/SinglePage/SinglePage'
import LoginPage from '../pages/AuthorizationPage/AuthorizationPage'
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'
import PrivateRoute from '../utils/privateRoute'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CreateArticlePage from '../pages/CreateArticlePage/CreateArticlePage'
import EditArticlePage from '../pages/EditArticlePage/EditArticlePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { fetchGetCurrentUser } from '../store/slices/services'
import { useAppDispatch } from '../assets/hooks/hooksByTS'

import Layout from './Layout/Layout'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGetCurrentUser())
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="articles" element={<Navigate to="/" replace />} />
        <Route path="articles/:slug" element={<SinglePage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="new-article" element={<CreateArticlePage />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

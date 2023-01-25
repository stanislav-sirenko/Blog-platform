import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage'
import SinglePage from '../pages/SinglePage/SinglePage'
import LoginPage from '../pages/AuthorizationPage/AuthorizationPage'
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

import Layout from './Layout/Layout'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="articles/:slug" element={<SinglePage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

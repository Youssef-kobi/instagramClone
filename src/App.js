import { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import * as PATHS from './constants/routes'

const App = () => {
  // eslint-disable-next-line
  const Login = lazy(() => import('./pages/Login'))
  const Register = lazy(() => import('./pages/Register'))

  const NotFound = lazy(() => import('./pages/NotFound'))
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='' element={<p className=''>Hello</p>} />
        <Route
          path={PATHS.LOGIN}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path={PATHS.SIGNUP}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path={PATHS.NOTFOUND}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

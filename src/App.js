import { lazy, Suspense, useMemo } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import * as PATHS from './constants/routes'
import UserContext from './context/user'
import useAuthListener from './hooks/use-auth-listener'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const App = () => {
  const { user } = useAuthListener()
  const value = useMemo(
    () => ({
      user,
    }),
    [{ user }]
  )
  return (
    <UserContext.Provider value={value}>
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
          <Route
            path={PATHS.DASHBOARD}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App

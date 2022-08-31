import { lazy, Suspense, useMemo } from 'react'
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import * as PATHS from './constants/routes'
import UserContext from './context/user'
import useAuthListener from './hooks/use-auth-listener'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const PrivateOutlet = () => {
  const { user } = useAuthListener()
  return user ? <Outlet /> : <Navigate to={PATHS.LOGIN} />
}
const PublicOutlet = () => {
  const { user } = useAuthListener()
  return !user ? <Outlet /> : <Navigate to={PATHS.DASHBOARD} />
}
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
      <Suspense fallback={<p>Loading...</p>}>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicOutlet />}>
              <Route path={PATHS.LOGIN} element={<Login />} />
              <Route path={PATHS.SIGNUP} element={<Register />} />
            </Route>
            <Route element={<PrivateOutlet />}>
              <Route path={PATHS.NOTFOUND} element={<NotFound />} />
              <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </UserContext.Provider>
  )
}

export default App

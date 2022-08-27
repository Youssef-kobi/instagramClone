import { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import * as PATHS from './constants/routes'

const App = () => {
  // eslint-disable-next-line
  const Login = lazy(() => import('./pages/Login'))
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
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import TimeLine from '../components/TimeLine'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard -instagram'
  }, [])
  return (
    <div className='bg-gray-background '>
      <Header />
      <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
        <TimeLine />
        <Sidebar />
      </div>
    </div>
  )
}

export default Dashboard

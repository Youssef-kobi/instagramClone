import { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard -instagram'
  }, [])
}

export default Dashboard

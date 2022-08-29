/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className='grid grid-cols-4 gap-4 mb-6 items-center'
    >
      <div className='flex item-center justify-between col-span-1'>
        <img src='/images/avatars/karl.jpg' alt='profile' />
      </div>
      <div className='col-span-3'>
        <p className='font-bold text-sm'>{username}</p>
        <p className='text-sm'>{fullName}</p>
      </div>
    </Link>
  )

export default User

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
}

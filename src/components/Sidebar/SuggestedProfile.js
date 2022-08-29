import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from '../../services/firebase'

/* eslint-disable react/prop-types */
const SuggestedProfile = ({
  LoggedInUserDocId,
  SuggestedProfileDocId,
  username,
  profileId,
  userId,
}) => {
  const [followed, setFollowed] = useState(false)
  const handleFollowUser = async () => {
    setFollowed(true)
    // update logged user following array
    await updateLoggedInUserFollowing(LoggedInUserDocId, profileId, followed)
    // update followed user's follower array
    await updateFollowedUserFollowers(SuggestedProfileDocId, userId)
  }

  return !followed ? (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex items-center justify-between'>
        <img
          src={`/images/avatars/${username}.jpg`}
          className='rounded-full w-8 flex mr-3'
          alt='suggested Profile'
        />
        <Link to={`/p/${username}`}>
          <p className='font-bold text-sm'>{username}</p>
        </Link>
      </div>
      <div>
        <button
          onClick={handleFollowUser}
          type='button'
          className='text-sx font-bold text-blue-medium'
        >
          Follow
        </button>
      </div>
    </div>
  ) : null
}

export default SuggestedProfile

SuggestedProfile.prototype = {
  SuggestedProfileDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
}

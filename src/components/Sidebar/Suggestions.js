/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile'

const Suggestions = ({ userId, following, LoggedInUserDocId }) => {
  // get suggested profiles from firebase
  const [profiles, setProfiles] = useState(null)
  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following)
      setProfiles(response)
    }
    if (userId) suggestedProfiles()
  }, [userId])

  return !profiles ? (
    <Skeleton count={10} height={150} className='mt-5' />
  ) : profiles.length > 0 ? (
    <div className='rounded flex flex-col'>
      <div className='text-sm flex items-center justify-between mb-2 '>
        <p className='font-bold text-gray-base'>Suggestions for you</p>
      </div>
      <div className='mt-4 grid gap-5'>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            SuggestedProfileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            LoggedInUserDocId={LoggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null
}

export default Suggestions

Suggestions.propTypes = {
  userId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  following: PropTypes.array,
  LoggedInUserDocId: PropTypes.string,
}

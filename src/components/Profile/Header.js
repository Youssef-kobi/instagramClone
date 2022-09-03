/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following,
    followers,
    username: profileUsername,
  },
  followingCount,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser()
  const [isFollowingProfile, setIsFollowingProfile] = useState(false)
  const activeBtnFollow = user.username && user.username !== profileUsername

  const handleToggleFollow = async () => {
    setIsFollowingProfile((prevState) => !prevState)
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    })
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    )
  }

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      )
      setIsFollowingProfile(!!isFollowing)
    }
    if (user?.username && profileUserId) isLoggedInUserFollowingProfile()
  }, [user?.username, profileUserId])

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex justify-center'>
        {user.username && (
          <img
            className='rounded-full h-40 w-40 flex'
            alt={` ${user.username} profile`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
        <div className='container flex item-center'>
          <p className='text-2xl mr-4'>{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
              type='button'
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className='container flex mt-4'>
          {!following || !followers ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span>{' '}
                {photosCount === 1 ? 'photo' : 'photos'}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>{' '}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followingCount}</span>
                following
              </p>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
  }).isRequired,
}

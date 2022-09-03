/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './Posts/Post'

const TimeLine = () => {
  const photos = usePhotos()
  return (
    <div className='container col-span-2'>
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className='mb-5' />
      ) : photos.length > 0 ? (
        <>
          {photos.map((photo) => (
            <Post key={photo.docId} photo={photo} />
          ))}
        </>
      ) : (
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )}
    </div>
  )
}

export default TimeLine

// TO-DO
// get user photos and followed

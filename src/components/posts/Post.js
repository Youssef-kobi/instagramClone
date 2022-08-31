/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import Actions from './Actions'
import Comments from './Comments'
import Footer from './Footer'
import Header from './Header'
import Image from './Image'

const Post = ({ photo }) => {
  // header , image , actions, footer,comment
  const commentInput = useRef(null)
  const handleFocus = () => commentInput.current.focus()
  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary mb-14'>
      <Header username={photo.username} />
      <Image src={photo.imageSrc} caption={photo.caption} />
      <Actions
        docId={photo.docId}
        totalLikes={photo.likes.length}
        handleFocus={handleFocus}
        likedPhoto={photo.userLikedPhoto}
      />
      <Footer caption={photo.caption} username={photo.username} />
      <Comments
        docId={photo.docId}
        comments={photo.comments}
        posted={photo.dateCreated}
        commentInput={commentInput}
      />
    </div>
  )
}

export default Post

Post.propTypes = {
  photo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }).isRequired,
}

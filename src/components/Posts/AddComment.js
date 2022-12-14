/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const {
    user: { displayName },
  } = useContext(UserContext)

  const handleSubmitComment = (event) => {
    event.preventDefault()
    setComments([{ displayName, comment }, ...comments])
    setComment('')
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          displayName,
          comment,
        }),
      })
  }
  return (
    <div className='border-t border-gray-primary'>
      <form
        method='POST'
        className='flex justify-between pl-0 pr-5'
        onSubmit={(event) =>
          comment.length > 0 ? handleSubmitComment(event) : event.preventDefault
        }
      >
        <input
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Add a comment ...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          type='submit'
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          // type='button'
          disabled={comment.length < 1}
          // onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default AddComment

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  commentInput: PropTypes.object,
}

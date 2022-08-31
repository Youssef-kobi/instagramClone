import PropTypes from 'prop-types'
import React from 'react'

const Image = ({ src, caption }) => {
  return <img src={src} alt={caption} />
}

export default Image

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

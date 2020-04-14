import React from 'react'
import PropTypes from 'prop-types'

function TextDisplay ({ text, shrunkText, onTextUpdate }) {
  return (
    <>
      <div className='flex pt3'>
        <div className='w-50 pr2'>
          <textarea
            className='w-100 h4 pa2'
            placeholder='What do you want to shrink?'
            onChange={onTextUpdate}
            value={text}
          />
        </div>
        <div className='w-50 pr2'>
          <div className='bg-washed-yellow h4 pa2'>
            {shrunkText}
          </div>
        </div>
      </div>
      <div className='flex pb3'>
        <div className='w-50'>
          {text && `${text.length} characters`}
        </div>
        <div className='w-50'>
          {shrunkText && `${shrunkText.length} characters`}
        </div>
      </div>
    </>
  )
}

TextDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  shrunkText: PropTypes.string.isRequired,
  onTextUpdate: PropTypes.func.isRequired
}

export default TextDisplay

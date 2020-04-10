import React from 'react'
import PropTypes from 'prop-types'

const TextEntry = ({ onChange, text, shrunkText }) => (
  <div className='TextEntry'>
    <div className='flex pt3'>
      <div className='w-50 pr2'>
        <textarea
          className='w-100 h4 pa2'
          placeholder='What do you want to shrink?'
          onChange={onChange}
          value={text}
        />
      </div>
      <div className='w-50 pr2'>
        <textarea
          className='w-100 h4 pa2 bg-washed-yellow'
          readOnly
          value={shrunkText}
        />
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
  </div>
)

TextEntry.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  shrinkText: PropTypes.string
}

export default TextEntry

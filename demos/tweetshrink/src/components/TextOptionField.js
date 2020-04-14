import React from 'react'
import PropTypes from 'prop-types'

const TextOptionField = ({ option, onChange }) => (
  <div className='w-50 pb2'>
    <label htmlFor={option.id}>
      <input type='checkbox' id={option.id} onChange={onChange} /> {option.label}
    </label>
  </div>
)

TextOptionField.propTypes = {
  onChange: PropTypes.func.isRequired,
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired
}

export default TextOptionField

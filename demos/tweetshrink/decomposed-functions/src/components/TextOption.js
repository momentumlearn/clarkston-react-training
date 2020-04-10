import React from 'react'
import PropTypes from 'prop-types'

const TextOption = ({ option, setOption }) => (
  <div className='w-50 pb2'>
    <label htmlFor={option.id}>
      <input type='checkbox' id={option.id} onChange={setOption} /> {' ' + option.label}
    </label>
  </div>
)

TextOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  setOption: PropTypes.func.isRequired
}

export default TextOption

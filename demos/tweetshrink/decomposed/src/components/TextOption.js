import React from 'react'

class TextOption extends React.Component {
  render () {
    const { option, setOption } = this.props

    return (
      <div className='w-50 pb2'>
        <label htmlFor={option.id}>
          <input type='checkbox' id={option.id} onChange={setOption} /> {' ' + option.label}
        </label>
      </div>
    )
  }
}

export default TextOption

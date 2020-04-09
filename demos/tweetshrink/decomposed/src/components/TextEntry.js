import React from 'react'

class TextEntry extends React.Component {
  render () {
    const { onChange, text, shrunkText } = this.props
    return (
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
  }
}

export default TextEntry

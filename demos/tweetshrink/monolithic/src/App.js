import React from 'react'
import 'tachyons/css/tachyons.min.css'
import textOptions from './textOptions'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      options: []
    }
  }

  updateText (event) {
    this.setState({ text: event.target.value })
  }

  setOption (option) {
    return (event) => {
      const value = event.target.checked
      console.log(value)
      const optionSet = new Set(this.state.options)
      if (value) {
        optionSet.add(option)
      } else {
        optionSet.delete(option)
      }
      this.setState({
        options: [...optionSet]
      })
    }
  }

  shrinkText () {
    let { text, options } = this.state

    if (!text) {
      return ''
    }

    let opObj
    options.forEach(option => {
      opObj = textOptions.find(o => o.id === option)
      if (opObj) {
        text = opObj.fn(text)
      }
    })

    return text
  }

  render () {
    const text = this.state.text
    const shrunkText = this.shrinkText()
    return (
      <div className='mw8 pa3 center sans-serif'>
        <h1 className='f-subheadline lh-solid ma0'>TweetShrink</h1>
        <div className='flex pt3'>
          <div className='w-50 pr2'>
            <textarea
              className='w-100 h4 pa2'
              placeholder='What do you want to shrink?'
              onChange={this
                .updateText
                .bind(this)}
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
        <div className='flex flex-wrap'>
          <div className='w-100'>
            <h2 className='f2 lh-copy normal ma0 pb2'>Options</h2>
          </div>
          {textOptions.map((option, idx) => (
            <div key={idx} className='w-50 pb2'>
              <label htmlFor={option.id}>
                <input type='checkbox' id={option.id} onChange={this.setOption(option.id)} /> {' ' + option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App

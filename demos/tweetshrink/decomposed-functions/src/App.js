import React from 'react'
import 'tachyons/css/tachyons.min.css'
import textOptions from './textOptions'
import TextEntry from './components/TextEntry'
import TextOption from './components/TextOption'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      options: []
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange (event) {
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
        <TextEntry
          onChange={this.handleTextChange}
          text={text}
          shrunkText={shrunkText}
        />

        <div className='flex flex-wrap'>
          <div className='w-100'>
            <h2 className='f2 lh-copy normal ma0 pb2'>Options</h2>
          </div>
          {textOptions.map((option, idx) => (
            <TextOption key={idx} option={option} setOption={this.setOption(option.id)} />
          ))}
        </div>
      </div>
    )
  }
}

export default App

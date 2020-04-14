import React from 'react'
import 'tachyons/css/tachyons.min.css'
import textOptions from './textOptions'
import TextDisplay from './components/TextDisplay'
import TextOptionField from './components/TextOptionField'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      options: []
    }

    this.handleTextUpdate = this.handleTextUpdate.bind(this)
  }

  handleTextUpdate (event) {
    this.setState({ text: event.target.value })
  }

  setOption (option) {
    return (event) => {
      const checked = event.target.checked
      const optionSet = new Set(this.state.options)
      if (checked) {
        optionSet.add(option)
      } else {
        optionSet.delete(option)
      }
      this.setState({
        options: [...optionSet]
      })

      // Alternative method

      // const options = this.state.options

      // if (checked && !options.includes(option)) {
      //   options.push(option)
      // }
      // if (!checked && options.includes(option)) {
      //   const idx = options.indexOf(option)
      //   options.splice(idx, 1)
      // }

      // this.setState({ options: [...options] })
    }
  }

  shrinkText () {
    let { text, options } = this.state

    if (!text) {
      return ''
    }

    options.forEach(optionId => {
      const textOption = textOptions.find(o => o.id === optionId)
      if (textOption) {
        text = textOption.fn(text)
      }
    })

    return text
  }

  render () {
    const { text } = this.state
    const shrunkText = this.shrinkText()

    return (
      <div className='mw8 pa3 center sans-serif'>
        <h1 className='f-subheadline lh-solid ma0'>TweetShrink</h1>
        <TextDisplay
          text={text}
          shrunkText={shrunkText}
          onTextUpdate={this.handleTextUpdate}
        />
        <div className='flex flex-wrap'>
          <div className='w-100'>
            <h2 className='f2 lh-copy normal ma0 pb2'>Options</h2>
          </div>
          {textOptions.map((option, idx) => (
            <TextOptionField key={idx} option={option} onChange={this.setOption(option.id)} />
          ))}
        </div>
      </div>
    )
  }
}

export default App

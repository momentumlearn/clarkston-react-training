import React, { useState } from 'react'
import 'tachyons/css/tachyons.min.css'
import textOptions from './textOptions'
import TextDisplay from './components/TextDisplay'
import TextOptionField from './components/TextOptionField'

function App () {
  const [text, setText] = useState('')
  const [options, setOptions] = useState([])

  function setOption (option) {
    return (event) => {
      const checked = event.target.checked

      let newOptions = [...options]
      if (checked) {
        newOptions.push(option)
      } else {
        newOptions = newOptions.filter(o => o !== option)
      }

      setOptions(newOptions)
    }
  }

  function shrinkText () {
    if (!text) {
      return ''
    }

    let shrunkText = text

    options.forEach(optionId => {
      const textOption = textOptions.find(o => o.id === optionId)
      if (textOption) {
        shrunkText = textOption.fn(shrunkText)
      }
    })

    return shrunkText
  }

  return (
    <div className='mw8 pa3 center sans-serif'>
      <h1 className='f-subheadline lh-solid ma0'>TweetShrink</h1>
      <TextDisplay
        text={text}
        shrunkText={shrinkText()}
        onTextUpdate={e => setText(e.target.value)}
      />
      <div className='flex flex-wrap'>
        <div className='w-100'>
          <h2 className='f2 lh-copy normal ma0 pb2'>Options</h2>
        </div>
        {textOptions.map((option, idx) => (
          <TextOptionField key={idx} option={option} onChange={setOption(option.id)} />
        ))}
      </div>
    </div>
  )
}

export default App

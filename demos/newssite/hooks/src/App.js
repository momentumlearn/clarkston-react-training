import React, { useState } from 'react'
import { useLocalStorage } from './customHooks'
import 'tachyons/css/tachyons.css'
import NewsSite from './components/NewsSite'
import ApiKeyContext from './ApiKeyContext'

function App () {
  const [apiKey, setApiKey] = useLocalStorage('newsApiKey', null)
  const [tokenField, setTokenField] = useState('')

  if (!apiKey) {
    return (
      <div className='App sans-serif'>
        <div className='mw8 center pa4'>
          <p className='f4'>
            This site requires a News API token to work. If you do not have one,
            you can get a token at <a href='https://newsapi.org/'>News API</a>.
          </p>

          <p>
            <label className='db' htmlFor='token'>API Token</label>
            <input
              className='db' type='text' id='token'
              value={tokenField}
              onChange={(e) => setTokenField(e.target.value)}
            />
            <button onClick={() => setApiKey(tokenField)}>Store API Token</button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <ApiKeyContext.Provider value={[apiKey, setApiKey]}>
      <NewsSite />
    </ApiKeyContext.Provider>
  )
}

export default App

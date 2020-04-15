import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import classnames from 'classnames'

import { getSources } from '../newsApi'
import { useEffectOnMount, useLocalStorage, useApiKey } from '../customHooks'

import MainPage from './MainPage'
import SourceHeadlinesPage from './SourceHeadlinesPage'
import Settings from './Settings'

function NewsSite () {
  const [sources, setSources] = useState(null)
  const [activeSources, setActiveSources] = useLocalStorage('activeSources', null)
  const [apiKey, setApiKey] = useApiKey()

  useEffectOnMount(() => {
    getSources(apiKey)
      .then((results) => {
        if (activeSources === null) {
          setActiveSources(results.sources.map(source => source.id))
        }
        setSources(results.sources)
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setApiKey(null)
        }
      })
  })

  function handleCheckSource (sourceId, active) {
    if (active) {
      setActiveSources(activeSources.concat([sourceId]))
    } else {
      setActiveSources(activeSources.filter(id => id !== sourceId))
    }
  }

  function BoldIfActiveLink ({ to, exact, ...rest }) {
    return (
      <Route
        path={to}
        exact={exact}
        children={({ match }) => (
          <Link to={to} className={classnames({ pr2: true, b: match, black: match, 'no-underline': match })} {...rest} />
        )}
      />
    )
  }

  return (
    <Router>
      <div className='App sans-serif'>
        <div className='mw8 center pa4'>
          <div className='flex pb2'>
            <BoldIfActiveLink exact to='/'>Top Headlines</BoldIfActiveLink>
            <BoldIfActiveLink to='/settings/'>Settings</BoldIfActiveLink>
          </div>

          <Switch>
            <Route path='/settings/'>
              <Settings activeSources={activeSources} sources={sources} handleCheckSource={handleCheckSource} />
            </Route>
            <Route path='/sources/:sourceId/'>
              <SourceHeadlinesPage />
            </Route>
            <Route exact path='/'>
              <MainPage activeSources={activeSources} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default NewsSite

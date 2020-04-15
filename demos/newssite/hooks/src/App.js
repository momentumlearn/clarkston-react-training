import React, { useState, useEffect } from 'react'
import update from 'immutability-helper'

import 'tachyons/css/tachyons.css'
import { getSources, getHeadlines } from './newsApi'
import NewsSources from './components/NewsSources'
import NewsStories from './components/NewsStories'

function useEffectOnMount (fn) {
  return useEffect(fn, [])
}

function App () {
  const [sources, setSources] = useState(null)
  const [stories, setStories] = useState(null)

  useEffectOnMount(() => {
    console.log('useEffectSources - get sources')
    getSources()
      .then((results) => {
        const newSources = results.sources
        newSources.forEach(source => {
          source.active = true
        })

        setSources(newSources)
      })
  })

  useEffectOnMount(() => {
    console.log('useEffectStories - get stories')
    getHeadlines()
      .then((results) => {
        setStories(results.articles)
      })
  })

  function activeSources () {
    if (!sources) {
      return null
    }
    return sources
      .filter(source => source.active)
      .map(source => source.id)
  }

  function storiesToShow () {
    if (!stories) {
      return null
    }

    const sources = activeSources()

    return stories
      .filter(story => {
        return sources.includes(story.source.id)
      })
      .slice(0, 10)
  }

  function handleCheckSource (sourceId, active) {
    const sourceIdx = sources.findIndex(source => source.id === sourceId)
    setSources(update(sources, { [sourceIdx]: { active: { $set: active } } }))
  }

  return (
    <div className='App sans-serif'>
      <div className='mw9 center pa4'>
        <div className='flex'>
          <div className='w-third'>
            <NewsSources
              sources={sources}
              onCheck={handleCheckSource}
            />
          </div>
          <div className='w-two-thirds'>
            <NewsStories stories={storiesToShow()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

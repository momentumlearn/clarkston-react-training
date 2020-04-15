import React, { useState } from 'react'

import { getHeadlines } from '../newsApi'
import NewsStories from './NewsStories'
import { useEffectOnMount, useApiKey } from '../customHooks'

function MainPage ({ activeSources }) {
  const [stories, setStories] = useState(null)
  const [apiKey, setApiKey] = useApiKey()

  useEffectOnMount(() => {
    console.log('useEffectStories - get stories')
    getHeadlines(apiKey)
      .then((results) => {
        setStories(results.articles)
      })
  })

  function storiesToShow () {
    if (!stories) {
      return null
    }

    return stories
      .filter(story => {
        return activeSources.includes(story.source.id)
      })
      .slice(0, 10)
  }

  return (
    <div className='MainPage'>
      <h1 className='f-subheadline ma0 pb3'>Top Headlines</h1>
      <NewsStories stories={storiesToShow()} />
    </div>
  )
}

export default MainPage

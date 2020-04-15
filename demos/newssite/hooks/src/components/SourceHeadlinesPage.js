import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { getSourceHeadlines } from '../newsApi'
import NewsStories from './NewsStories'
import { useEffectOnMount, useApiKey } from '../customHooks'

function SourceHeadlinesPage () {
  const [stories, setStories] = useState(null)
  const { sourceId } = useParams()
  const [apiKey, setApiKey] = useApiKey()

  useEffectOnMount(() => {
    console.log('useEffectStories - get stories')
    getSourceHeadlines(apiKey, sourceId)
      .then((results) => {
        setStories(results.articles)
      })
  })

  return (
    <div className='SourceHeadlinesPage'>
      <h1 className='f-subheadline ma0 pb3'>Headlines for {sourceId}</h1>
      <NewsStories stories={stories} />
    </div>
  )
}

export default SourceHeadlinesPage

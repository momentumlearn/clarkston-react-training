import React from 'react'
import PropTypes from 'prop-types'
import NewsStory, { NewsStoryPropType } from './NewsStory'

function NewsStories ({ stories }) {
  const loading = !stories

  if (loading) {
    return (
      <div style={{
        textAlign: 'center'
      }}
      >
        <span className='loader loader-xl' />
      </div>
    )
  }

  return (
    <div className='NewsStories'>
      {stories
        .slice(0, 10)
        .map((story, idx) => <NewsStory key={idx} story={story} />)}
    </div>
  )
}

NewsStories.propTypes = {
  stories: PropTypes.arrayOf(NewsStoryPropType)
}

export default NewsStories

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

function NewsStory ({ story }) {
  return (
    <div className='NewsStory pb4'>
      <h2 className='f4 ma0 pb3'>
        {story.title}
      </h2>
      <div className='flex pb3'>
        <div className='w-50'>
          {
            story.source.id
              ? <Link to={`/sources/${story.source.id}`}>{story.source.name}</Link>
              : story.source.name
          }
        </div>
        <div className='w-50 tr'>
          {moment(story.publishedAt).format('lll')}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='pr3'>
          <div className='description pb3'>
            {story.description}
          </div>
          <div className='link'>
            <a target='_blank' rel='noopener noreferrer' href={story.url}>Read the whole story</a>
          </div>
        </div>
        {story.urlToImage && (
          <div className='mw6'>
            <div className='image'>
              <img src={story.urlToImage} alt={story.title} />
            </div>
          </div>)}
      </div>
    </div>
  )
}

export const NewsStoryPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  source: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  publishedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string.isRequired
})

NewsStory.propTypes = {
  story: NewsStoryPropType.isRequired
}

export default NewsStory

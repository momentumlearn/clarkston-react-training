import React from 'react'
import { Link } from 'react-router-dom'

function NewsSources ({ activeSources, sources, onCheck }) {
  const loading = !sources

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
    <div className='NewsSources'>
      <h2 className='f4 ma0 pb3'>Sources</h2>
      <div className='flex flex-wrap'>
        {sources.map((source, idx) => (
          <div className='source pa2 w5' key={idx}>
            <input
              type='checkbox'
              checked={activeSources.includes(source.id)}
              onChange={event => onCheck(source.id, event.target.checked)}
            /> {` ${source.name} `}
            <Link to={`/sources/${source.id}/`}>&#x2197;</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSources

import React from 'react'

class NewsSources extends React.Component {
  render () {
    const { sources, onCheck } = this.props
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
      <div className='NewsSources fixed vh-100 overflow-y-auto'>
        <h2 className='f4 ma0 pb3'>Sources</h2>
        {sources.map((source, idx) => (
          <div className='source pv1' key={idx}>
            <input
              type='checkbox'
              checked={source.active}
              onChange={event => onCheck(source.id, event.target.checked)}
            /> {` ${source.name} `}
            <a target='_blank' rel='noopener noreferrer' href={source.url}>&#x2197;</a>
          </div>
        ))}
      </div>
    )
  }
}

export default NewsSources

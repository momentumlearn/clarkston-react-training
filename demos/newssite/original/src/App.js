import React from 'react'
import update from 'immutability-helper'

import 'tachyons/css/tachyons.css'
import { getSources, getHeadlines } from './newsApi'
import NewsSources from './components/NewsSources'
import NewsStories from './components/NewsStories'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      sources: null,
      stories: null
    }
    this.handleCheckSource = this.handleCheckSource.bind(this)
  }

  componentWillMount () {
    Promise.all([getSources(), getHeadlines()])
      .then((values) => {
        const sources = values[0].sources
        sources.forEach(source => {
          source.active = true
        })

        this.setState({
          sources: values[0].sources,
          stories: values[1].articles
        })
      })
  }

  activeSources () {
    if (!this.state.sources) {
      return null
    }
    return this
      .state
      .sources
      .filter(source => source.active)
      .map(source => source.id)
  }

  storiesToShow () {
    if (!this.state.stories) {
      return null
    }

    const sources = this.activeSources()

    return this
      .state
      .stories
      .filter(story => {
        return sources.indexOf(story.source.id) !== -1
      })
      .slice(0, 10)
  }

  handleCheckSource (sourceId, active) {
    const sources = this.state.sources
    const sourceIdx = sources.findIndex(source => source.id === sourceId)
    this.setState({
      sources: update(sources, { [sourceIdx]: { active: { $set: active } } })
    })
  }

  render () {
    return (
      <div className='App sans-serif'>
        <div className='mw9 center pa4'>
          <div className='flex'>
            <div className='w-third'>
              <NewsSources
                sources={this.state.sources}
                onCheck={this.handleCheckSource}
              />
            </div>
            <div className='w-two-thirds'>
              <NewsStories stories={this.storiesToShow()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

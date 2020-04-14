import React from 'react'
import PropTypes from 'prop-types'
import getJSON from '../getJSON'

class PatternSelector extends React.Component {
  constructor () {
    super()
    this.state = { loaded: false, patterns: [], selectedIndex: 0 }
  }

  componentDidMount () {
    getJSON('/patterns/').then(patterns => {
      this.setState({ patterns, loaded: true })
      this.props.onPatternSelection(patterns[0])
    })
  }

  shiftIndex (shift) {
    /*
    The purpose of this function is to allow the arrow buttons to not only
    change the current pattern, but also to rotate the patterns in a continuous
    loop.
    */
    let index = (this.state.selectedIndex + shift) % this.state.patterns.length
    while (index < 0) {
      index += this.state.patterns.length
    }
    this.setState({
      selectedIndex: index
    }, () => {
      this.props.onPatternSelection(this.state.patterns[this.state.selectedIndex])
    })
  }

  render () {
    const { selectedPattern } = this.props

    if (!this.state.loaded || !selectedPattern) {
      return <div />
    }

    return (
      <div className='PatternSelector'>
        <div className='arrow left-arrow padded-click'>
          <a href='#' onClick={() => this.shiftIndex(-1)}>&#9664;</a>
        </div>
        <img className='thumbnail' alt={selectedPattern.name} src={`/img/patterns/${selectedPattern.image}`} />
        <div className='arrow right-arrow'>
          <a href='#' onClick={() => this.shiftIndex(1)}>&#9654;</a>
        </div>
      </div>
    )
  }
}

const patternShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

PatternSelector.propTypes = {
  selectedPattern: PropTypes.shape(patternShape),
  handlePatternChange: PropTypes.func
}

export default PatternSelector

import React from 'react'
import PropTypes from 'prop-types'
import getJSON from '../getJSON'

class PatternSelector extends React.Component {
  constructor () {
    super()
    this.state = {
      loaded: false,
      patterns: null,
      selectedIndex: null
    }
  }

  componentWillMount () {
    const onSelect = this.props.onSelect

    getJSON('/patterns/')
      .then(data => {
        this.setState({ loaded: true, patterns: data, selectedIndex: 0 }, () => {
          onSelect(this.state.patterns[this.state.selectedIndex])
        })
      })
  }

  shiftIndex (shift) {
    /*
    The purpose of this function is to allow the arrow buttons to not only
    change the current pattern, but also to rotate the patterns in a continuous
    loop.
    */
    const onShift = this.props.onSelect
    let index = (this.state.selectedIndex + shift) % this.state.patterns.length
    while (index < 0) {
      index += this.state.patterns.length
    }
    this.setState({
      selectedIndex: index
    }, () => {
      onShift(this.state.patterns[this.state.selectedIndex])
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div />
    }

    const patterns = this.state.patterns
    const pattern = patterns[this.state.selectedIndex]
    console.log(this.state)
    return (
      <div className='PatternSelector'>
        <div className='arrow left-arrow padded-click'>
          <a onClick={(e) => this.shiftIndex(-1)}>&#9664;</a>
        </div>
        <img className='thumbnail' alt={pattern.name} src={`/img/patterns/${pattern.image}`} />
        <div className='arrow right-arrow'>
          <a onClick={(e) => this.shiftIndex(1)}>&#9654;</a>
        </div>
      </div>
    )
  }
}

PatternSelector.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default PatternSelector

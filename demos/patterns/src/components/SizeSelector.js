import React from 'react'
import PropTypes from 'prop-types'
import getJSON from '../getJSON'

class SizeSelector extends React.Component {
  constructor () {
    super()
    this.state = {
      loaded: false,
      sizes: null
    }
  }

  componentWillMount () {
    const onSelect = this.props.onSelect
    getJSON('/sizes/')
      .then(data => {
        this.setState({
          loaded: true,
          sizes: data
        }, () => {
          onSelect(this.state.sizes[0])
        })
      })
  }

  render () {
    if (!this.state.loaded) {
      return <div />
    }

    const sizes = this.state.sizes
    const onSelect = this.props.onSelect

    return (
      <div className='SizeSelector'>
        <label>Fabric Size</label>
        <select onChange={evt => onSelect(sizes[evt.target.value])}>
          {sizes.map((size, idx) => (
            <option key={idx} value={idx}>{size.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default SizeSelector

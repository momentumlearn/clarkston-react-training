import React from 'react'
import PropTypes from 'prop-types'
import getJSON from '../getJSON'

class SizeSelector extends React.Component {
  constructor () {
    super()
    this.state = { loaded: false, sizes: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    getJSON('/sizes/').then(sizes => {
      this.setState({ sizes, loaded: true })
      this.props.onSizeSelection(sizes[0])
    })
  }

  handleChange (event) {
    const sizeId = parseInt(event.target.value)
    const newSize = this.state.sizes.find(size => size.id === sizeId)
    this.props.onSizeSelection(newSize)
  }

  render () {
    const { selectedSize } = this.props
    const { sizes, loaded } = this.state

    if (!loaded || !selectedSize) {
      return <div />
    }

    return (
      <div className='SizeSelector'>
        <label>Fabric Size</label>
        <select value={selectedSize.id} onChange={this.handleChange}>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>{size.name} ({size.dimensions[0]}" x {size.dimensions[1]}")</option>
          ))}
        </select>
      </div>
    )
  }
}

const sizeShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

SizeSelector.propTypes = {
  selectedSize: PropTypes.shape(sizeShape),
  handleSizeChange: PropTypes.func
}

export default SizeSelector

/* globals Image */

import React from 'react'
import PropTypes from 'prop-types'

const DPI = 150
const CANVAS_WIDTH = 500

class FabricDisplay extends React.Component {
  constructor () {
    super()
    this.canvas = React.createRef()
  }

  componentDidUpdate () {
    /*
    When FabricDisplay updates, it needs to re-draw a canvas object. canvas
    elements are drawn using JavaScript methods, which requires us to go
    outside React rendering. We use componentDidUpdate to run code after
    the props change.
    */
    const { pattern, size } = this.props
    if (pattern && size && this.canvas.current) {
      const context = this.canvas.current.getContext('2d')
      const img = new Image()
      img.addEventListener('load', () => {
        // clear canvas
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // draw the new piece of fabric
        const { width, height } = img
        const imgWidthIn = width / DPI
        const imgHeightIn = height / DPI
        const inchPixels = CANVAS_WIDTH / size.dimensions[0]
        const tileWidth = Math.ceil(inchPixels * imgWidthIn)
        const tileHeight = Math.ceil(inchPixels * imgHeightIn)
        const tileX = Math.ceil(CANVAS_WIDTH / tileWidth)
        const tileY = Math.ceil(DPI * size.dimensions[1] / tileHeight)
        for (let x = 0; x < tileX; x++) {
          for (let y = 0; y < tileY; y++) {
            context.drawImage(img, x * tileWidth, y * tileHeight, tileWidth, tileHeight)
          }
        }
      }, false)
      img.src = `/img/patterns/${pattern.image}`
    }
  }

  render () {
    const { pattern, size } = this.props

    // Exit early if we don't yet have a pattern and size.
    if (!(pattern && size)) {
      return <div />
    }

    const width = CANVAS_WIDTH
    const height = width / size.dimensions[0] * size.dimensions[1]

    /*
    The ref attribute on canvas below is how we move from React-world back to
    DOM manipulation. With React, we usually never directly touch the DOM, but
    in this case, we need the actual canvas element from the DOM. `ref` takes
    a function that takes the DOM element being created and performs whatever
    manipulation you need. In our case, we save the DOM element and the canvas
    context to our object for later manipulation.
    */
    return (
      <div className='FabricDisplay'>
        <canvas
          width={width}
          height={height}
          ref={this.canvas}
        />
      </div>
    )
  }
}

FabricDisplay.propTypes = {
  pattern: PropTypes.shape({
    image: PropTypes.string
  }),
  size: PropTypes.shape({
    dimensions: PropTypes.arrayOf(PropTypes.number)
  })
}

export default FabricDisplay

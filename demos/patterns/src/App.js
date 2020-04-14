import React from 'react'
import 'shoelace-css/dist/shoelace.css'
import './App.css'
import SizeSelector from './components/SizeSelector'
import PatternSelector from './components/PatternSelector'
import FabricDisplay from './components/FabricDisplay'
import getJSON from './getJSON'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      selectedSize: null,
      selectedPattern: null
    }

    this.handleSizeSelection = this.handleSizeSelection.bind(this)
    this.handlePatternSelection = this.handlePatternSelection.bind(this)
  }

  handleSizeSelection (size) {
    this.setState({ selectedSize: size })
  }

  handlePatternSelection (pattern) {
    this.setState({ selectedPattern: pattern })
  }

  render () {
    const { selectedPattern, selectedSize } = this.state

    return (
      <div className='App'>
        <div className='container'>
          <h1>Patterns!</h1>
          <div className='row'>
            <div className='col'>
              <PatternSelector selectedPattern={selectedPattern} onPatternSelection={this.handlePatternSelection} />
              <SizeSelector selectedSize={selectedSize} onSizeSelection={this.handleSizeSelection} />
            </div>
            <div className='col'>
              <FabricDisplay size={selectedSize} pattern={selectedPattern} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

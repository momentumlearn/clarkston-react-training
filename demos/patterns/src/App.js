import React from 'react'
import 'shoelace-css/dist/shoelace.css'
import './App.css'
import PatternSelector from './components/PatternSelector'
import SizeSelector from './components/SizeSelector'
import FabricDisplay from './components/FabricDisplay'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      pattern: null,
      size: null
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <PatternSelector onSelect={pattern => this.setState({ pattern: pattern })} />
              <SizeSelector onSelect={size => this.setState({ size: size })} />
            </div>
            <div className='col'>
              <FabricDisplay pattern={this.state.pattern} size={this.state.size} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

import React from 'react'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      clicks: 0
    }
  }

  clickText () {
    if (this.state.clicks === 1) {
      return '1 click'
    }
    return `${this.state.clicks} clicks`
  }

  render () {
    return (
      <div className='App'>
        <main>
          <h2>{this.clickText()}</h2>
          <button
            onClick={event => this.setState({ clicks: this.state.clicks + 1 })}
          >
          Click me
          </button>
        </main>
      </div>
    )
  }
}

export default App

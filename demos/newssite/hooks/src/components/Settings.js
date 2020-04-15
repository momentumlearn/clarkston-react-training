import React from 'react'
import NewsSources from './NewsSources'

function Settings ({ activeSources, sources, handleCheckSource }) {
  return <NewsSources activeSources={activeSources} sources={sources} onCheck={handleCheckSource} />
}

export default Settings

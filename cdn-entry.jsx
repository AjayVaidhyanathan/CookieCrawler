import React from 'react'
import ReactDOM from 'react-dom/client'
import CookieBanner from './CookieBanner'

// Exporting React and ReactDOM as well in case they are needed
export { React, ReactDOM, CookieBanner }

/**
 * Helper to initialize the banner in a specific DOM element
 * @param {string} elementId - The ID of the container div
 * @param {object} props - Component props (restaurantName, privacyUrl, etc.)
 */
export function init(elementId, props) {
  const container = document.getElementById(elementId)
  if (!container) return
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(CookieBanner, props))
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './styles/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
)

// client side rendered app : react (cra)
// -> database : Firebase
// -> react-loading-skeleton
// -> tailwind

// Folders Structure
// -> components
// -> constants
// -> context
// -> helpers
// -> hooks
// -> pages
// -> lib (Firebase folder)
// -> services (Firebase functions)
// -> styles (tailwind Folder) ./app ./tailwind

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App'
import recoilInitializer from '@src/atoms/recoilInitializer'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <RecoilRoot initializeState={recoilInitializer}>
    <App />
  </RecoilRoot>,
)

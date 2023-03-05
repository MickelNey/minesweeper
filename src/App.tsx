import React from 'react'
import './App.css'
import {Grid, Smile, Timer, MinesCounter} from "./components";
import {useGameContext} from "hooks";
import divider from './assets/divider.png'

function App() {
  return (
      <div className="App">
        <div className='menu'>
          <MinesCounter />
          <Smile/>
          <Timer />
        </div>
        <img className={'divider'} src={divider}/>
        <Grid/>
      </div>
  )
}

export default App

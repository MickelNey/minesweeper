import React from 'react'
import './App.css'
import {Grid} from "./components/Grid/Grid";
import {Smile} from "./components/Smile/Smile";
import {Timer} from "./components/Timer/Timer";
import {MinesCounter} from "./components/MinesCounter/MinesCounter";
import {useGameProvider} from "./context";
import divider from './assets/divider.png'

function App() {

  const { gameStore} = useGameProvider()

  console.log(gameStore)

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

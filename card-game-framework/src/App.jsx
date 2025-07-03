import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components-standalone/Nav/Nav'
import SideMenu from './components-standalone/SideMenu/SideMenu'
import HearthstoneBoard from './card-game-framework/example/HearthstoneBoard.jsx'


export default function App() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  return (
    <div className='page'>
      <Nav options={[
        { name: "Home", href: "#" },
        { name: "About", href: "#" },
        { name: "Play", href: "#" }
      ]} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen}/>

      <HearthstoneBoard/>

    </div>
  )
}

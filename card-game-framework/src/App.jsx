import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components-standalone/Nav/Nav'
import SideMenu from './components-standalone/SideMenu/SideMenu'
import HearthstoneBoard from './card-game-framework/example/HearthstoneBoard.jsx'
import { loginWithGoogle, useFirebaseAuthUser } from './services/external/Firebase.js'
import { createDocument } from './services/external/FirebaseRealtimeDatabase.js'

import './App.css'
import './app-color-vars.css'
import './app-layout-vars.css'
import './app-text-vars.css'
import './index.css'
import './app-base-style.css'
import './app-layout-style.css'

export default function App() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const userState = useFirebaseAuthUser()

  async function onButtonClick() {
    if (userState == null) {
      await loginWithGoogle()
    } else {
      console.log({userState})
      alert('Already logged in!')
    }
  }

  return (
    <div className='page'>
      <Nav options={[
        { name: "Home", href: "#" },
        { name: "About", href: "#" },
        { name: "Play", href: "#" }
      ]} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen}/>

      <div className='flex-row gap-1'>
        <button onClick={onButtonClick} >{
          userState == null?
            'Login':
          'Logged In'
        }</button>
      </div>



      <HearthstoneBoard/>

    </div>
  )
}

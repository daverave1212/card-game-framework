import { useEffect, useState } from "react"
import './SideMenu.css'


export default function SideMenu({ isOpen, setIsOpen, children }) {

    const [state, setState] = useState('CLOSED')

    useEffect(() => {
        if (isOpen) {
            setState('OPEN')
        } else {
            setState('CLOSING')
            setTimeout(() => {
                setState('CLOSED')
            }, 500)
        }
    }, [isOpen])

    const sideMenuWrapperClass =
        state == 'OPEN' ? 'side-menu-wrapper side-menu-wrapper--open' :
        state == 'CLOSING' ? 'side-menu-wrapper side-menu-wrapper--open' :
        'side-menu-wrapper'
    
    const blackOverlayClass =
        state == 'OPEN' ? 'side-menu-black-overlay side-menu-black-overlay--open' :
        'side-menu-black-overlay'
    
    const sideMenuClass = 
        state == 'OPEN' ? 'side-menu side-menu--open': 
        'side-menu'

    function closeSideMenu() {
        setIsOpen(false)
    }

    return (
        <div class={sideMenuWrapperClass} onClick={closeSideMenu}>
            <div class={blackOverlayClass}></div>
            <div class={`${sideMenuClass} shadowed`} onClick={evt => evt.stopPropagation()}>
                { children }
            </div>
        </div>
    )
}